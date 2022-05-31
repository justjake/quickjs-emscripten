import React, { useEffect } from "react"
import "./App.css"
import { getQuickJS } from "quickjs-emscripten"

function stringify(val: unknown) {
  if (typeof val === "undefined") {
    return "undefined"
  }

  return JSON.stringify(val, undefined, 2)
}

const initialCode = `
let cow = 1;
[cow, ++cow];
`.trim()

function App() {
  const [js, setJs] = React.useState(initialCode)
  const [evalResult, setEvalResult] = React.useState<unknown>(undefined)
  const handleEval = React.useCallback(async () => {
    const QuickJS = await getQuickJS()
    try {
      const result = QuickJS.evalCode(js)
      console.log("eval result:", result)
      setEvalResult(result)
    } catch (err) {
      console.log("eval error:", err)
      setEvalResult(err)
    }
  }, [js, setEvalResult])
  useEffect(() => {
    handleEval()
  }, [handleEval, js, setEvalResult])
  return (
    <div className="App">
      <div>
        <h1>quickjs-emscripten</h1>
        <p>
          Javascript/Typescript bindings for <a href="https://bellard.org/quickjs/">QuickJS</a>, a
          modern Javascript interpreter written in C by Fabrice Bellard and Charlie Gordon.
        </p>
        <ul>
          <li>Safely evaluate untrusted Javascript (up to ES2020).</li>
          <li>Create and manipulate values inside the QuickJS runtime.</li>
          <li>Expose host functions to the QuickJS runtime.</li>
        </ul>
        <p>
          <a href="https://github.com/justjake/quickjs-emscripten">Github</a> -{" "}
          <a href="https://github.com/justjake/quickjs-emscripten/blob/main/doc/globals.md">
            Documentation
          </a>{" "}
          - <a href="https://www.npmjs.com/package/quickjs-emscripten">NPM</a>
        </p>
        <h2>Eval JS code safely</h2>
        <label htmlFor="js">This code is evaluated in a QuickJS virtual machine:</label>
        <div>
          <textarea id="js" value={js} onChange={(e) => setJs(e.target.value)} />
        </div>
        <h3>Eval result:</h3>
        <pre>{stringify(evalResult)}</pre>
      </div>
    </div>
  )
}

export default App
