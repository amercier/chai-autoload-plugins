/**
 * Builds a regular expression matcher
 * @param {RegExp} regexp A regular expression
 * @return {function(string:string): boolean} `true` if `string` matches `regexp`, `false` otherwise
 */
export function buildRegExpMatcher(regexp) {
  return function regExpMatcher(string) {
    return regexp.test(string);
  };
}

/**
 * Builds an array string matcher
 * @param {string[]} array An array of strings
 * @return {function(array:array): boolean} `true` if `array` contains `string`, `false` otherwise
 */
export function buildArrayMatcher(array) {
  return function arrayMatcher(string) {
    return array.indexOf(string) !== -1;
  };
}

/**
 * Create a matcher from a config value, based on its type:
 * - string: creates a regular expression matcher
 * - array of string: create an array matcher
 * @param {string|string[]} config A configuration value
 * @return {(function(string:string):boolean|function(string:string):boolean)} The matcher
 */
export function buildMatcher(config) {
  return typeof config === 'string' ? buildRegExpMatcher(new RegExp(config)) : buildArrayMatcher(config);
}

/**
 * Create a string filter function based on an include/exclude configurations pair
 * @param {string|string[]} include Regular expression, or array of names to include
 * @param {string|string[]} exclude Regular expression, or array of names to exclude
 *                                  (takes precence over `include`)
 * @return {function(string:string): boolean} A string filter function
 */
export function buildFilter(include, exclude) {
  const includeMatcher = buildMatcher(include);
  const excludeMatcher = buildMatcher(exclude);
  return string => !excludeMatcher(string) && includeMatcher(string);
}
