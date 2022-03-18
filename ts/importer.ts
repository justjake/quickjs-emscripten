import { QuickJSAsyncContext, QuickJSAsyncRuntime } from "."
import { QuickJSContext } from "./context"
import { QuickJSRuntime } from "./runtime"
import {
  JSModuleLoader,
  JSModuleLoaderAsync,
  JSModuleNormalizer,
  JSModuleNormalizerAsync,
} from "./types"
import { isFail } from "./vm-interface"

export interface ImportInfo {
  filename: string
  imports: Set<string>
  body: string
}

class ImportResolver {
  context: QuickJSContext

  constructor(
    public runtime: QuickJSRuntime,
    public moduleNormalizer: JSModuleNormalizer | undefined = undefined
  ) {
    this.context = runtime.newContext()
  }

  findImports(filename: string, body: string): ImportInfo {
    const importInfo: ImportInfo = {
      filename: filename,
      imports: new Set(),
      body,
    }
    const loader: JSModuleLoader = (_ctx, moduleName) => {
      importInfo.imports.add(moduleName)
      return ""
    }
    this.runtime.setModuleLoader(loader, this.moduleNormalizer)
    this.context.compileModule(filename, body)
    this.runtime.removeModuleLoader()
    return importInfo
  }
}

export class AsyncImportLoader {
  public cache = new Map<string, ImportInfo>()
  public readonly runtime: QuickJSAsyncRuntime
  public readonly resolver: ImportResolver
  public readonly baseModuleLoader: JSModuleLoaderAsync
  public readonly baseModuleNormalizer?: JSModuleNormalizerAsync

  constructor(args: {
    runtime: QuickJSAsyncRuntime
    resolverRuntime: QuickJSRuntime
    moduleLoader: JSModuleLoaderAsync
    moduleNormalizer?: JSModuleNormalizerAsync
  }) {
    if (args.runtime === args.resolverRuntime) {
      throw new Error("Please construct a separate runtime for the resolver.")
    }

    this.runtime = args.runtime
    this.resolver = new ImportResolver(
      args.resolverRuntime,
      args.moduleNormalizer as JSModuleNormalizer | undefined
    )
    this.baseModuleLoader = args.moduleLoader
    this.baseModuleNormalizer = args.moduleNormalizer
  }

  readonly moduleLoader: JSModuleLoaderAsync = (context, moduleName) => {
    let cached = this.cache.get(moduleName)
    if (cached) {
      return cached.body
    }

    return this.loadModuleFirstTime(context, moduleName)
  }

  private async loadModuleFirstTime(context: QuickJSAsyncContext, moduleName: string) {
    let loaded = await this.baseModuleLoader(context, moduleName)
    if (typeof loaded !== "string") {
      if (isFail(loaded)) {
        return loaded
      }
      loaded = loaded.value
    }

    // Populate cache, prevent circular fetching
    const importInfo = this.resolver.findImports(moduleName, loaded)
    this.cache.set(moduleName, importInfo)

    // Wait for dependent modules to load into cache
    await Promise.all(
      Array.from(importInfo.imports).map((moduleName) => this.moduleLoader(context, moduleName))
    )

    return importInfo.body
  }
}
