//二叉树解决
function folding(N){
  //深度为N完全二叉树的节点数为2^n - 1 
  N = 2<<(N-1);
  --N;
  
  let res = [];
  for(let i = 0; i < N; i++){
    if(i == 0){
      res.push("down");
    }else{
      i % 2 == 0 ? res.push("up") : res.push("down");
    }
  }
  console.log(res.toString());
}

folding(3)
