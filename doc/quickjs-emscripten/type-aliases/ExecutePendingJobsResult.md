[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / ExecutePendingJobsResult

# Type Alias: ExecutePendingJobsResult

> **ExecutePendingJobsResult** = [`DisposableResult`](DisposableResult.md)<`number`, [`QuickJSHandle`](QuickJSHandle.md) & `object`>

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:36](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L36)

Used as an optional for the results of executing pendingJobs.
On success, `value` contains the number of async jobs executed
by the runtime.

* [Source](#source)

## Source

```ts
export type ExecutePendingJobsResult = DisposableResult<
  /** Number of jobs successfully executed. */
  number,
  /** The error that occurred. */
  QuickJSHandle & {
    /** The context where the error occurred. */
    context: QuickJSContext
  }
>
```
