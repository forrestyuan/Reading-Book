/*
 * @Author: foxyuan 
 * @Date: 2021-10-29 10:04:09 
 * @Last Modified by: foxyuan
 * @Last Modified time: 2021-10-29 16:17:38
 */


/**
 * @param {character[][]} board
 * @return {boolean}
 */
//有效的数独
var isValidSudoku = function (board) {
  let row = new Array(9).fill(0);
  let col = new Array(9).fill(0);
  let square = new Array(9).fill(0);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let val = board[r][c];
      if (val !== '.') {
        let squareIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
        let uniqueVal = 1 << Number(val); //利用位，使得值的唯一性，本题有 9 为，1<<1,1<<2,1<<3,....,1<<9（最多32位，超出32位无法进行位运算，需要降位处理)
        if (
          row[r] & uniqueVal ||
          col[c] & uniqueVal ||
          square[squareIndex] & uniqueVal
        ) {
          return false;
        }
        // 累存数据：eg: 0111 =  0100 | 0010 | 0001
        row[r] |= uniqueVal;
        col[c] |= uniqueVal;
        square[squareIndex] |= uniqueVal;
      }
    }
  }
  return true;
};

console.log(
  isValidSudoku([
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ]),
);
