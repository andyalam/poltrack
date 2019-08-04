/** Returns a numeric hash for the inputString */
export function getHash(inputString: string): number {
  // based on https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
  let hash = 0,
    i,
    chr;
  if (inputString.length === 0) {
    return hash;
  }

  for (i = 0; i < inputString.length; i++) {
    chr = inputString.charCodeAt(i);
    // tslint:disable-next-line:no-bitwise
    hash = (hash << 5) - hash + chr;
    // tslint:disable-next-line:no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/** returns true if d is a valid Date object
 * @param d - date object to test
 */
export function isValidDateObject(d: Date): boolean {
  return d && d.getTime && !isNaN(d.getTime());
}

/** returns true if d is a valid Date string
 * @param d - date string to test
 */
export function isValidDateString(d: string): boolean {
  if (!d) {
    return false;
  }

  const o = new Date(d);
  return isValidDateObject(o);
}

/** Report cards "far in the past" date used as substitute for null dates from database*/
export function reportCardsMinDate(): Date {
  return new Date(1900, 1, 1, 0, 0);
}

/** Report cards "far in the future" date used as substitute for null dates from database*/
export function reportCardsMaxDate(): Date {
  return new Date(2100, 1, 1, 0, 0);
}
