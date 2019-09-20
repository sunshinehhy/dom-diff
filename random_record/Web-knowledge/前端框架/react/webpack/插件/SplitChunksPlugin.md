chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
minSize: 表示在压缩前的最小模块大小，默认为0；
minChunks: 表示被引用次数，默认为1；
maxAsyncRequests: 最大的按需(异步)加载次数，默认为1；
maxInitialRequests: 最大的初始化加载次数，默认为1；
name: 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
cacheGroups: 缓存组。

对于缓存组是一个对象，除了可以有上面的chunks、minSize、minChunks、maxAsyncRequests、maxInitialRequests、name外，还有其他的一些参数：

注意：如果不在缓存组中重新赋值，缓存组默认继承上面的选项，但是还有一些参数是必须在缓存组进行配置的。

priority: 表示缓存的优先级；
test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
reuseExistingChunk: 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。

1. 基本使用
首先，在新版本的webpack会`默认对代码进行拆分`，拆分的规则是：
- 模块被重复引用或者来自node_modules中的模块
- 在压缩前最小为30kb
- 在按需加载时，请求数量小于等于5
- 在初始化加载时，请求数量小于等于3

小于30kb的模块不值得再单独发送一次请求，在很小的模块的前提下，相比与多次打包，减少请求次数成本要低。

当然也可以不使用默认的配置，比如这样：
```
new webpack.optimize.SplitChunksPlugin({
    chunks: "all",
    minSize: 20000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true
)}
```

上面的代码就表示，在所有代码中，引用模块大小最小为20kb，引用次数最少为1次，按需加载最大请求次数为5，初始化加载最大请求次数为3的所有模块就行拆分到一个单独的代码块中，name表示代码的名字，设置为true则表示根据模块和缓存组秘钥自动生成。

2. 使用缓存组(Cache Groups)
如果想继续细分代码，可以使用缓存组(Cache Groups)。同样的，缓存组也有默认的配置；缓存组默认将node_modules中的模块拆分带一个叫做vendors的代码块中，将最少重复引用两次的模块放入default中。

这是一段官方里面的代码：
```
splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20
            reuseExistingChunk: true,
        },
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        }
    }
}
```
上面是缓存组的默认配置，可以通过default:false禁用默认的缓存组，然后就可以自定义缓存组，将初始化加载时被重复引用的模块进行拆分，就像这样：

```
cacheGroups: {
    commons: {
        name: "commons",
        chunks: "initial",
        minChunks: 2
    }
}
```

之后就随心所欲，可以根据具体的需求，创建多个缓存组：
```
cacheGroups: {
    a: {
        // ...
    },
    b: {
        // ...
    }
    // ...
}

```

## 
```
splitChunks: {
	cacheGroups: {
		commons: {
			test: /[\\/]node_modules[\\/]
			name: "vendors",
			chunks: "all"
		}
	}
}
```

//加入它，会在build下生成一个带有hash值的js文件。创建一个供应商块，其中包含整个应用程序中来自node_modules的所有代码。注意:下载的代码比需要的要多。

```
// entry.js
import("./a");
// a.js
import "react";
// ...
```
结果:将创建包含react的单独块。在导入调用中，这个块与包含./a的原始块并行加载。

原因:

条件1:块包含来自node_modules的模块
条件2:反应大于30kb
条件3:导入调用中并行请求的数量为2
条件4:在初始页面加载时不影响请求

为什么说得通呢?

与您的应用程序代码相比，react通常不会改变。通过将它移动到一个单独的块中，这个块可以与应用程序代码分开缓存(假设您使用的是长期缓存:chunkhash, records, Cache-Control)。

```
// entry.js
import("./a");
import("./b");

// a.js
import "./helpers"; // helpers is 40kb in size
// ...

// b.js
import "./helpers";
import "./more-helpers"; // more-helpers is also 40kb in size
// ...
```

结果:将创建一个包含./helper及其所有依赖项的独立块。在导入调用时，这个块与原始块并行加载。

原因:

条件1:块在两个导入调用之间共享
条件2:助手大于30kb
条件3:导入调用中并行请求的数量为2
条件4:在初始页面加载时不影响请求
为什么说得通呢?

`将helper代码放入每个块中可能意味着用户需要下载两次。通过使用单独的块`，它只下载一次。实际上这是一种权衡，因为现在我们要支付额外请求的费用。这就是为什么最小大小为30kb的原因。

optimizations.splitChunks.chunks: "all" the same would happend for initial chunks。Chunks甚至可以在入口点和按需加载之间共享。

- 配置
对于那些想要对这个功能有更多控制权的人来说，有很多选择来满足你的需求。

`免责声明:不要试图在没有测量的情况下手动优化。选择默认值是为了符合web性能的最佳实践`。

- 缓存组
优化将模块分配给缓存组。
默认值将所有模块从node_modules分配给一个名为vendor的缓存组，`所有模块以至少2个区块的形式复制到更改组默认值`。
一个模块可以分配给多个缓存组。然后，优化选择`优先级更高的缓存组(优先级选项)或形成更大块的缓存组`。

- 条件
当所有条件都被填满时，来自相同块和缓存组的模块将形成一个新的块。
配置条件有4个选项:
最小大小(默认:30000)块的最小大小。
minChunks(默认值:1)在拆分之前共享模块的最小数量的消息块
maxInitialRequests(默认3)在一个入口点上并行请求的最大数量
maxAsyncRequests(默认5)按需加载时并行请求的最大数量

- 命名
要控制分割块的块名，可以使用name选项。

注意:`当为不同的分割块分配相同的名称时，它们会合并在一起`。这可以用于将所有供应商模块放入所有其他入口点/分裂点共享的单个块中，但我不建议这样做。这可能导致下载的代码比需要的要多。

magic value true会根据数据块和缓存组键自动选择名称。另外，还可以传递字符串或函数。

当名称与entrypoint名称匹配时，将删除entrypoint。


- 选择的块
使用chunks选项，可以配置选定的区块。有3个值可能是“初始”、“异步”和“全部”。在配置时，优化只选择初始块、按需块或所有块。

reuseExistingChunk选项允许在模块完全匹配时重用现有的块，而不是创建新的块。

可以对每个缓存组进行控制。

- 选择模块
test选项控制这个缓存组选择哪些模块。省略它选择所有模块。它可以是RegExp、字符串或函数。

它可以匹配绝对模块资源路径或块名。当匹配块名时，将选择该块中的所有模块。


- 缓存配置组
这是默认配置:
```
splitChunks: {
	chunks: "async",
	minSize: 30000,
	minChunks: 1,
	maxAsyncRequests: 5,
	maxInitialRequests: 3,
	name: true,
	cacheGroups: {
		default: {
			minChunks: 2,
			priority: -20
			reuseExistingChunk: true,
		},
		vendors: {
			test: /[\\/]node_modules[\\/]/,
			priority: -10
		}
	}
}
```

默认情况下，缓存组从splitChunks继承选项。但是测试、优先级和重用存在块只能在缓存组级别上配置。

cacheGroups是一个对象，其中键是缓存组键，值是选项:

否则，上面列出的选项中的所有选项都是可能的:chunk、minSize、minChunks、maxAsyncRequests、maxinitialrequest、name。

`要禁用默认组，请传递false`: optimize . splitchunks . cachegroups .default: false

默认组的优先级为负，因此任何自定义缓存组的优先级都更高(默认为0)。

以下是一些例子及其影响:
```
splitChunks: {
	cacheGroups: {
		commons: {
			name: "commons",
			chunks: "initial",
			minChunks: 2
		}
	}
}
```

创建一个公有块，其中包括入口点之间共享的所有代码。

注意:下载的代码比需要的要多。
```
splitChunks: {
	cacheGroups: {
		commons: {
			test: /[\\/]node_modules[\\/]
			name: "vendors",
			chunks: "all"
		}
	}
}
```

创建一个供应商块，其中包含整个应用程序中来自node_modules的所有代码。

注意:下载的代码比需要的要多。

## optimization.runtimeChunk
optimization.runtimeChunk: true向每个只包含运行时的入口点添加一个额外的块。