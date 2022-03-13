export const QTS_DEBUG = false || Boolean(process.env.QTS_DEBUG)
export let debug = QTS_DEBUG ? console.log.bind(console) : () => {}
