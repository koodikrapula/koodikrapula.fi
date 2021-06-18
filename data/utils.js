function isProdEnv() {
  return process.env.NODE_ENV === 'production'
}

function isScheduled(data) {
  return data.date > Date.now()
}

module.exports = { isProdEnv, isScheduled }
