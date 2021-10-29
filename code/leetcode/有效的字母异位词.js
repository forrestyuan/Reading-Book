/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  if (s.length === 1 && t.length === 1) return s[0] === t[0];
  let map = {}
  for (let i = 0; i < s.length; i++) {
    let ch = s[i];
    map[ch] = map[ch] ? map[ch] + 1 : 1;
  }
  console.log(map)
  for (let j = 0; j < t.length; j++) {
    let tch = t[j];
    if (map[tch]) {
      --map[tch]
    } else {
      return false
    }
    console.log(map)
  }
  return true;
};

console.log(isAnagram("anagram", "nagaram"))
console.log(isAnagram("rat", "car"))
console.log(isAnagram("aacc", "ccac"))