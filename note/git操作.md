1. 常见的linux命令介绍
touch 1.txt //创建一个文件   
mkdir mydir //创建一个目录  
ls //查看当前目录内容  
cat//查看文件内容  
vim//打开文件编辑器  
rm //删除文件  
....  

2. git入门指引
[啥是git分离头指针](https://zhuanlan.zhihu.com/p/158635615)
* git rm --cached filename //将已添加到暂存区的文件删除，变回已修改的状态
* 对于git config中的user.name 与 user.email来说，有2个地方可以设置
  * 计算机全局 git config --global（添加）  | git config --global unset ...(删除)
  * 项目区域性 git config --local（添加） | git config --local unset ...(删除)
* git commit --amend -m '修正上一次提交的title'// 用来修正上次提交的说明
* git log -number  查看最近number条的提交记录
1.  .gitignore文件与分支  
.gitignore 文件里描述的是提交到远程仓库时被忽略的文件。
    ```bash
    *.a #忽略所有.a结尾的文件
    !lib.a # 但是lib.a除外
    /TODO # 仅仅忽略项目根目录下的TODO文件，不包括subdir/TODO
    build/  # 忽略build目录下的所有文件
    doc/*.txt # 会忽略doc/note.txt但不包括doc/server/sample.txt
    doc/**/*.txt # 一个星号是一层，两个星号是所有层
    ```
    `cd - `会回到上一次的目录
4. 再谈git分支
* `fast-forward`  
如果可能，合并分支时Git会使用fast-forward模式  
在这种模式下，删除分支时会丢掉分支信息  
合并时加上 `--no-ff`参数会禁用`fast-forward`模式，这样会多出一个commit id  
  ```bash
  git merge --no-ff dev
  ```
* git 回退版本  
  返回到上一版本
  ```bash
  git reset --hard HEAD^     #
  git reset --hard HEAD~1    #
  git reset --hard commit_id #
  ```
  返回到某一个版本`git reflog`
5. git标签  
  新建标签有两种：轻量级标签，带有附注标签
  * 轻量级标签
    ```bash
    git tag v1.0.1
    ```
  * 带有附注的标签
    ```bash
    git tag -a v1.0.2 -m 'release version'
    ```
    删除标签：`git tag -d tag_name`  
    `git push`并不会把tag标签传送到远端服务器上，只有通过显式命令才能分享标签到远端仓库。
    * push单个tag，命令格式为：`git push origin [tagname]`例如：
      ```bash
      git push origin v1.0     #将本地v1.0的tag推送到远端服务器
      ```
    * push所有tag，命令格式为：`git push [origin] --tags`例如： 
      ```bash
      git push --tags
      #或
      git push origin --tags
      ```
6. 将本地新建的仓库推到远程仓库
    ```bash
    git remote add origin <仓库地址>
    git push -u origin master
    ```
7. 远程分支和本地分支
    ```bash
    git push origin develop:develop # 推送本地develop分支到远程develop分支
    git pull origin develop:develop # 拉取远程develop分支到本地develop分支
    ```
8. git submodule
    ```bash
    # 引用子模块
    git add submodule git@github.com:gitlecture/git_child.git mymodule
    # 拉取所有的子模块
    git submodule foreach git pull
    ```
    如果第一次克隆远程仓库，这个仓库里包含了子模块，初始情况我们`git clone`下来后需要手动初始化一下子模块的数据。
    ```bash
    git clone <parentmodule>
    git submodule init
    git submodule update --recursive
    # 或者一次性
    git clone <parentmodule> --recursive
    ```
    删除子模块
    ```bash
    git rm --cached <子模块名称>
    git rm submodule
    ```
9. git subtree  
   类似与git submodule，git subtree可以双向修改代码 
10. git cherry-pick  
    git cherry-pick命令的作用，就是将指定的提交（commit）应用于其他分支。
    ```bash
    git cherry-pick <commitHash>
    ```
11. git rebase   
    类似与merge，merge会产生一个新的提交。
12. 「Git」合并多个 Commit
    👉[点击查看](https://www.jianshu.com/p/964de879904a)
13. 有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有--amend 选项的提交命令来重新提交;修补提交最明显的价值是可以稍微改进你最后的提交，而不会让“啊，忘了添加一个文件”或者 “小修补，修正笔误”这种提交信息弄乱你的仓库历史。
    ```bash
    $ git commit -m 'initial commit'
    $ git add forgotten_file
    $ git commit --amend
    ```

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

### 创建本地分支并且关联远程分支develop
git checkout develop

### 更新本地分支develop
git pull --ff

### 创建本地分支，并切换到feature
git checkout -b feature

### 提交代码
git commit -a -m "xxx"

### 切换开发分支拉取最新代码, 并返回feature分支(避免在develop分支上冲突)
git checkout develop
git pull --ff
git checkout feature

### 合并分支 rebase （可能产生冲突）
git rebase develop

### 切换至develop分支, 并合并分支
git checkout develop
git merge --no-ff feature 

### 提交代码
git push

### 其他参考学习

#### 1. 配置git, 保存户名、密码等
+ (1) git config --list                    //查看当前git配置
+ (2) git config credential.helper store   //配置存储模式
+ (3) git config user.name 'xxx.xx'        //设置用户名
+ (4) git config user.email 'xxx.xx'       //设置email


#### 2. 分支管理
+ (1) git branch -a                        //查看所有分支
+ (2) git branch dev                       //创建本地分支
+ (3) git branch -d dev                    //删除本地分支
+ (3) git push origin dev                  //创建远程分支
+ (4) git push origin --delete dev         //删除远程分支
+ (5) git checkout -b dev origin/dev       //创建并切换本地dev分支，并关联远程dev分支
+ (6) git branch --set-upstream-to=origin dev       //本地分支关联远程dev分支


#### 3.提交分支、冲突解决
+ (1) git status                           //查看当前代码状态
+ (2) git checkout a.js                    //复原a.js文件
+ (3) git add .                            //添加所有文件
+ (4) git clean -df                        //清除未添加文件
+ (5) git commit -a -m "xx"                //提交所有文件
+ (6) git rebase develop                   //合并develop分支到当前分支
+ (7) git rebase develop --continue        //解决冲突后继续合并
+ (8) git rebase develop --skip            //跳过冲突
+ (9) git merge --no-ff feature -m ""      //合并feature分支到当前主分支
+ (10) git pull --ff                       //更新最新代码
+ (11) git push                            //推送本地代码
+ (12) git clone xxx                       //克隆远程分支到本地