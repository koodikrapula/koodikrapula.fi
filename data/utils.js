export function isProdEnv() {
  return process.env.NODE_ENV === 'production'
}

export function isScheduled(data) {
  return data.date > Date.now()
}
