export const QTS_DEBUG = false || Boolean(typeof process === "object" && process.env.QTS_DEBUG)
export const debugLog = QTS_DEBUG ? console.log.bind(console) : () => {}
