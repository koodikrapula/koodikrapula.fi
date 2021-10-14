// TODO: Move and rename this file to e.g. `/src/js/utils/index.js`
// because this is not needed in content (Markdown) files

/**
 * Checks whether the current Netlify deploy context is `production`.
 * Returns `false` in non-Netlify environments, e.g. localhost.
 *
 * Other possible contexts are `deploy-preview` and `branch-deploy`.
 *
 * @see {@link https://docs.netlify.com/configure-builds/environment-variables/#build-metadata}
 *
 * @returns {boolean}
 */
export const isNetlifyProdEnv = () => process.env.CONTEXT === 'production'

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
