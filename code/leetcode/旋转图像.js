/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

 var rotate = function (matrix) {
  if (matrix.length === 1 && matrix[0].length === 1) return matrix;
  let len = matrix.length;
  for (let r = 0; r < len / 2; r++) {
    for (let c = r; c < len - r - 1; c++) {
      let temp = matrix[r][c];
      let followRow = len - r - 1; // 跟随行变化
      let followCol = len - c - 1; // 跟随列变化
      matrix[r][c] = matrix[followCol][r];  // 左上 = 左下
      matrix[followCol][r] = matrix[followRow][followCol]; // 左下 = 右下
      matrix[followRow][followCol] = matrix[c][followRow]; // 右下 = 右上
      matrix[c][followRow] = temp; //右上 = 左上
    }
  }
  return matrix
};

console.log(rotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]))