/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
 var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
      for(let i =1; i<=n ; i++){
          if(isBadVersion(i)) return i;
      }
  };
};

// 解法二 ， 二分查找

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

 var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
    let start = 1;
    let end = n;
    let res = 1;
    if(n < 3) return isBadVersion(1) ? 1 : 2;
    while( start < end){
      let half = Math.floor((end - start)/ 2) + start;
      if(isBadVersion(half)){
        end = half;
        res = half;
      }else{
        start = half + 1;
      }
      if( start === end) return end;
    }
    return res;
  };
};