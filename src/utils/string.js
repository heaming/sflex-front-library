export function getByte(string, bytesPerKoChar = 3) {
  return Array.from(string).reduce((a, v) => a + (v.charCodeAt() > 127 ? bytesPerKoChar : 1), 0);
}

export function getMaxByteString(string, maxBytes = 0, bytesPerKoChar = 3) {
  if (maxBytes > 0) {
    for (let i = 0, sum = 0; i < string.length; i += 1) {
      sum += string[i].charCodeAt() > 127 ? bytesPerKoChar : 1;

      if (sum > maxBytes) { return string.substring(0, i); }
    }
  }

  return string;
}

export function isOverByte(string, maxBytes = 0, bytesPerKoChar = 3) {
  return maxBytes > 0 && getByte(string, bytesPerKoChar) > maxBytes;
}

export function isEmpty(str) {
  return (str === '' || str === undefined || str === null || str.length === 0);
}
