export default {
  human: (date) => date.toLocaleString('fi', { dateStyle: 'short' }),

  // TODO [2021-10-01]: Daylight saving time?
  robot: (date) => `${date.toISOString().split('T')[0]}T06:00:00+03:00`,
}
