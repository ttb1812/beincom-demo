/* eslint-disable no-extend-native */

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
export {};
declare global {
  interface String {
    /**
     *
     * Unicode two string and check equal them.
     * @type {Function} unUnicodeMatch
     * @param {string} lookupString string need check equal
     * @returns {boolean}
     * @memberof String
     */
    unUnicodeMatch(lookupString: string): boolean;
    /**
     *
     * Will unUnicode this string
     * @type {Function} unUnicode
     * @returns {boolean}
     * @memberof String
     */
    unUnicode(): string;
    /**
     * @summary generate uuidv4 string.
     **/
    uuidv4(): string;
  }
}

// parse unicode string to un-unicode string
String.prototype.unUnicode = function () {
  var result = this.toLowerCase();
  result = result.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  result = result.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  result = result.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  result = result.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  result = result.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  result = result.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  result = result.replace(/đ/g, 'd');
  return result;
};

// match un-unicode lookup string in unicode full string
String.prototype.unUnicodeMatch = function (lookupString: string) {
  const fullString = this.unUnicode();
  lookupString = lookupString.unUnicode();
  return fullString.indexOf(lookupString) >= 0;
};

String.prototype.uuidv4 = function () {
  return uuidv4();
};
