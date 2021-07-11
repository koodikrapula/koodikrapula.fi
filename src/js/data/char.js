/**
 * Special characters.
 *
 * The names follow HTML entity names.
 * E.g. `char.copy` = `&copy;`.
 *
 * Use these instead of typing special characters to oth‍er files
 * because special characters in source code are bad:
 * - Differences between some characters are hard or impossible to see.
 *   E.g. space vs non-breaking space or hyphen vs en dash.
 * - Some characters are impossible to see.
 *   E.g. zero-width joiner.
 */
export default {
  copy: '©',
  nbsp: ' ', // non-breaking space
  ndash: '–', // en dash
  rarr: '→',
  times: '×',
  trade: '™',
}
