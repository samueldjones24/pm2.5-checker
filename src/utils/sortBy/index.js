// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sortby-and-_orderby

export function sortBy(array, key) {
  return array
    .concat()
    .sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
}
