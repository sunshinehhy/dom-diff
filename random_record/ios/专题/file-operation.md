## 文件操作函数
1. lastPathComponent获取网络数据或者路径的文件名以及后缀   （带后缀）
```
比如：源字符串   --->     结果字符串
“/tmp/scratch.tiff”   --->     “scratch.tiff”
“/tmp/scratch”   --->     “scratch”
“/tmp/”   --->     “tmp”
“scratch”   --->     “scratch”
“/”   --->     “/”
```
- 获取不带后缀的文件名：通过lastPathComponent获取的文件名再使用deletingPathExtension
- 获取文件扩展名：pathExtension    比如：a.txt  pathExtension这个字符串的值将是“txt”。句点将被去掉了。如果没有句点指明扩展名，将返回一个空串。如果文件不存在，也将返回空串  
- components(separatedBy:)：也可以使用此函数用.分开分别获取文件名和扩展名。
- pathComponents：获取路径各文件部分组成一个数组，如果获取最后一个文件名可以通过获取数组最后一个值
- range(of:)：也可以获取文件名


```
    仅仅是把文件名保存下来，而没有保存图片。下载的应该是音频和图片。
    let url = URL(string: aa!)
    if let url = url{
        let lastPathName = url.deletingPathExtension()
        cell.selectedImageView.image = UIImage(named: lastPathName.path)
    }
```

2. subpathsOfDirectory(atPath:)和subpaths(atPath:)都是取得一个目录下得所有文件名（也可以是目录名），也包含隐藏文件。

contentsOfDirectory(atPath:)和subpaths(atPath:)均可用来获取指定目录下的子项（文件或文件夹）列表，在获取子项列表时他们都会忽略目录'.'和'..'，所获取的子项列表顺序不是固定的（两次同样的操作所返回的子项列表顺序可能不同）。

它门的区别是：前者以非递归的方式获取子项列表，而后者以递归的方式获取子项列表(会获取子目录的文件)。

Returns an array of strings identifying the paths for all items in the specified directory.
Performs a shallow search of the specified directory and returns the paths of any contained items.
enumerator(atPath:) 枚举路径，深遍历

3. createDirectory(at:withIntermediateDirectories:attributes:) 创建路径

4. createFile(atPath:contents:attributes:) 在路径中创建文件，此路径是包含要创建的文件名的，因此创建文件时可以使用appendingPathComponent(_:)在指定的文件夹下append文件名，由此得出文件路径。

5. NSSearchPathForDirectoriesInDomains  获取document目录，在此目录下创建文件或者文件夹，也可以用appendingPathComponent(_:)，再分别创建文件夹或者文件名

6. changeCurrentDirectoryPath(_:)更改到待操作的目录下，做文件读写就很方便了，不用加上全路径

7. removeItem(atPath:)移除指定目录下的文件和目录

8. NSMutableData创建动态数据对象，NSData创建静态数据对象。（NSMutableData需要重点看）
用NSMutableData可以创建混合数据

9. 常用方法
https://www.cnblogs.com/jay-dong/archive/2013/01/21/2870414.html
+ +(NSString *)pathWithComponens:components　　//根据components中的元素构造有效路径
+ -(NSArray *)pathComponents　　//析构路径，获得组成此路径的各个部分
+ -(NSString *)lastPathComponent　　//提取路径的最后一个组成部分
+ -(NSString *)pathExtension　　//从路径的最后一个组成部分中提取其扩展名
+ -(NSString *)stringByAppendingPathComponent:path　　//将path添加到现有路径的末尾
+ -(NSString *)stringByAppendingPathExtension:ext　　//将指定的扩展名添加到路径的最后一个组成部分
+ -(NSString *)stringByDeletingLastPathComponent　　//删除路径的最后一个组成部分
+ -(NSString *)stringByDeletingPathExtension　　//从文件的最后一部分删除扩展名
+ -(NSString *)stringByExpandingTileInPath　　　//将路径中代字符扩展成用户主目录（~）或指定用户的主目录（~user）
+ -(NSString *)stringByresolvingSymlinksInPath　　//尝试解析路径中的符号链接
+ -(NSString *)stringByStandardizingPath　　//通过尝试解析~、..（父目录符号）、.（当前目录符号）和符号链接来标准化路径

10. UIImagePNGRepresentation(_:)——Returns the data for the specified image in PNG format

11. copyItem(at:to:)复制文件到
moveItem(atPath:toPath:)移动文件到

12. 写入文件中和把文件写入文件夹下面，对比实现？
writeToFile：把数据写入文件中
func write(_ data: Data)：把数据写入文件中   seekToEndOfFile()指到文件末尾
readDataToEndOfFile()：读可用数据到文件后面
Data数据可以转化为NSString
创建文件之前应该先判断文件是否存在？

13. 判断文件和目录中内容是否相等
contentsEqual(atPath:andPath:)

## 2017.11.24

- NSSearchPathForDirectoriesInDomains(to, .userDomainMask, true).first  是为了创建一系列路径字符串，
以应该搜索目录的顺序排列，此方法返回的目录可能不存在。此方法简单地为您提供了所请求目录的适当位置。根据应用程序的需要，可以由开发人员创建适当的目录和中间的任何目录。（以我的理解如果是创建文件应该是按创建顺序排列）
- FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)是返回URL
路径，更格式化，使用需要用do-try-catch  （Locates and optionally creates the specified common directory in a domain.）

- FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)是返回一组确定域中的URL目录（Returns an array of URLs for the specified common directory in the requested domains.）
 生成文件名序列号一直在变化

- 两者区别：
```
 let subDirectory = try fileManager.contentsOfDirectory(atPath: directoryPathString.path)
 try fileManager.contentsOfDirectory(at: directoryUrl!, includingPropertiesForKeys: nil, options: [])   
```
 URL 没有contains函数，它属于String

 ## 2017.11.26

  let created = fileManager.createFile(atPath: filePath.path, contents: nil, attributes: nil)
  在有子文件夹的情况下必须使用filePath.path，不能使用filePath.absoluteString

  let request = URLRequest(url:url)中url不能包含有中文
  加上static，引用download中的函数（比如：getDirectoryUrlFromDirectory），不用加上download.

URLSessionDelegate在应用程序退出或显式地使会话失效之前，会话对象对委托保持很强的引用。如果您没有通过调用invalidateAndCancel()或finishTasksAndInvalidate()方法使会话失效，则应用程序将泄漏内存，直到它退出。