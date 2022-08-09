export function getByte(s, bytesPerKoChar = 3) {
  return Array.from(s).reduce((a, v) => a + (v.charCodeAt() > 127 ? bytesPerKoChar : 1), 0);
}

export function getMaxByteLength(s, maxBytes = 0, bytesPerKoChar = 3) {
  if (maxBytes > 0) {
    for (let i = 0, sum = 0; i < s.length; i += 1) {
      sum += s[i].charCodeAt() > 127 ? bytesPerKoChar : 1;
      if (sum > maxBytes) { return i; }
    }
  }
  return s.length;
}

export function getMaxByteString(s, maxBytes = 0, bytesPerKoChar = 3) {
  const i = getMaxByteLength(s, maxBytes, bytesPerKoChar);
  return s.substring(0, i);
}

export function isOverByte(s, maxBytes = 0, bytesPerKoChar = 3) {
  return maxBytes > 0 && getByte(s, bytesPerKoChar) > maxBytes;
}

export function getNumberWithComma(s, decimalLimit = -1) {
  const x = s.toString().split('.');
  x[0] = x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (x[1] && decimalLimit > -1) {
    x[1] = x[1].substring(0, decimalLimit);
  }

  return x.join('.');
}
