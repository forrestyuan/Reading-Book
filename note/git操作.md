### 1. 解决冲突
```bash
#暂存现有代码
git stash 
#切到dev分支
git checkout <dev-branch> 
# 拉取新代码
git pull 
# 切回特性分之
git checkout <feature-branch> 
# 合并代码，如果有冲突，先解决
git merge 
# 最后把暂存的代码释放出来
git stash pop 
```