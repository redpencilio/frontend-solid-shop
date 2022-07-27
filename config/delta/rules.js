export default [
  {
    match: {
      // listen to all changes
    },
    callback: {
      url: 'http://mu-search/update',
      method: 'POST'
    },
    options: {
      resourceFormat: "v0.0.1",
      gracePeriod: 2000 // 2 seconds
    }
  }
]
