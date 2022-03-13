const DEBUG = false || Boolean(process.env.DEBUG)

export let debug = DEBUG ? console.log.bind(console) : () => {}
