/*
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat
 */

export const englishFormatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

export const polishFormatter = new Intl.ListFormat('pl', {
  style: 'long',
  type: 'conjunction',
});
