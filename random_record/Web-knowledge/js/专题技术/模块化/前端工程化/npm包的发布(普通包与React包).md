# npm包的发布

假设该待发布包在你本地的项目为 project1

## 包的本地安装测试

在发布之前往往希望在本地进行安装测试。那么需要一个其他的项目来本地安装待发布项目。

假设该其他项目为project2。假设project2和project1在同一级目录下。

### 1. 创建指向待测试包的符号链接包

```cmd
cd project1
npm link
```

### 2. 本地安装

```cmd
cd project2
npm install '../project1'
```

这样就只需要在其他项目中只安装一次project1,因为安装的是指向project1的符号链接包，其一直指向真实的project1。如果project1被修改，那么project2依赖的project1也是被修改后的。

### 3.删除

要先解除对该project1的link：

```cmd
cd project1
npm unlink
```

再手动删除project2下的project1的符号链接包。如果不这样清除，在project1发布后，project2想要安装npm仓库中的project1就不能成功。

***待弄懂此块儿link的原理及为什么要这样才能清除***

## 包的正式发布

### 1. 完成git提交相关步骤

```cmd
  cd project1
  git add .
  git commit -m "xxx"
```

### 2. 修改version && git 打标签

```
 npm version major/minor/patch
```

package.json会改变version字段值，然后也会自动加一个git的tag,同时也会增加一个commit(加上步骤1的commit，不出意外的话此时本地有2个commits等待push)。假设version 字段自动变为1.3.4。

另外，此处git如果想手动打标签可以这样(当只想发布git release却不想更新npm的时候可以这样)

```cmd
git tag -a v1.3.4 -m 'my version 1.3.4'
```

### 3. git 发布到远程

最好是保持npm的版本和git release的版本一致，所以有必要先将git tag发布出来:

```cmd
git push
git push origin v1.3.4 //此时自动执行ci测试
```

如果想要一次同时推送branch和tag:

```cmd
 git push origin master --tags
```

参见<https://www.git-scm.com/docs/git-push>

<https://stackoverflow.com/questions/17219102/how-to-make-git-push-include-tags-within-a-branch/17219399#17219399>

The new "--follow-tags" option tells "git push" to push relevant annotated tags when pushing branches out.
This won't push all the tags, but only the ones accessible from the branch(es) HEAD(s) you are pushing.

### 4. npm发布

如果是该包第一次发布：

```cmd
npm whoami //验证你的凭据已存储在客户端
npm publish --access=public //如果是公开包这样发布，如果不是公开的包则去掉--access=public即可
```

如果是该包已经发布过，现在只是更新：

```cmd
npm publish
```

然后去npmjs.com看一下你的包是否已经发布/更新

## 3. 安装已发布的包

```cmd
cd project2
npm install project1 --save
```