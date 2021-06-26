/**
 * Checks whether the current build is a production build.
 *
 * @returns {boolean}
 */
export const isProdBuild = () => process.env.NODE_ENV === 'production'

/**
 * Checks whether the given content's published date is in the future.
 *
 * @param {{date: Date}} data
 * 11ty content object.
 *
 * @returns {boolean}
 */
export const isScheduled = (data) => data.date > Date.now()
