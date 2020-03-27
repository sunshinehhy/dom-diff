const crypto = require('crypto');
const fs = require("fs");
const path = require("path");
let OSS = require('ali-oss');
let specialFileDirectory = path.resolve('./src');

// 直接获取项目根目录
let projectRootDirectory = path.resolve('.');
// let projectName = projectRootDirectory.lastIndexOf('/');
let projectName = projectRootDirectory.substring(projectRootDirectory.lastIndexOf('/')+1,projectRootDirectory.length);
console.log(projectName);

//遍历文件（同步方式）
let fileDisplaySync = function (filePath, filePathArr) {
    //根据文件路径读取文件，返回文件列表
    // console.log('开始遍历文件');
    let files = fs.readdirSync(filePath);
    //   console.log(files);
    //遍历读取到的文件列表
    files.forEach(function (filename) {
        //获取当前文件的绝对路径
        let fileDirectory = path.join(filePath, filename);
        // console.log(fileDirectory);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let stats = fs.statSync(fileDirectory);
        let isFile = stats.isFile();//是文件
        let isDir = stats.isDirectory();//是文件夹
        if (isFile) {
            // console.log('文件——' + fileDirectory);
            // 设置搜索目标文件
            if (
                // fileDirectory.indexOf('.js') > -1 ||
                // fileDirectory.indexOf('.vue')>-1||       //去掉注释，就可以实现支持vue文件
                fileDirectory.indexOf('New.scss') > -1   //去掉PullNew，就可以支持所有scss文件
                // || fileDirectory.indexOf('.css') > -1
            ) 
            {
                // console.log('是目标文件');
                filePathArr.push(fileDirectory);
            }
        }
        if (isDir) {
            // console.log('目录——' + fileDirectory);
            fileDisplaySync(fileDirectory, filePathArr);//如果是文件夹，递归遍历该文件夹下面的文件     
        }
    });
}

// 使用绝对路径替换文件filePath中的符合reg正则表达式的str，并返回所有图片绝对路径列表
let matchAll = function (filePath, str, reg) {
    let res = []   //所有图片绝对路径列表
    let match
    let newStr = str;
    // console.log('原始：'+filePath); 
    let getFileDirectory = filePath;
    //去除路径中的文件名，只保留文件夹路径
    let dex = getFileDirectory.lastIndexOf('/')
    if (dex > -1) {
        getFileDirectory = getFileDirectory.substring(0, dex)
    } else {
        console.log('错误(没找到/)：' + getFileDirectory);
    }
    // 查找图片链接，并用绝对路径替换，此条件会不会进入死循环
    while (match = reg.exec(str)) {
        // 去除双引号、单引号
        let matchStr = match[0].replace(/[\"\']/g, '')
        if (matchStr.indexOf('http://') > -1 || matchStr.indexOf('https://') > -1) {
            continue
        }
        let tmpDir = getFileDirectory  //去除../对应的上一级目录之前
        console.log('xxxxxxxxxxxxxxxxxxxxxxxtmpDir：' + tmpDir);
        // console.log('xxxxxxxxxxxxxxxxxxxxxxxstr：'+str);
        console.log('xxxxxxxxxxxxxxxxxxxxxxxmatchStr：' + matchStr);
        //图片路径中包含../, 每个../均对应去除项目路径的末一级目录
        while (matchStr.indexOf('../') > -1) {
            matchStr = matchStr.replace('../', '')
            // console.log('matchStr'+matchStr); 
            let dex2 = tmpDir.lastIndexOf('/')
            if (dex2 > -1) {
                tmpDir = tmpDir.substring(0, dex2)
            }
            else {
                console.log('错误(没找到/)：' + tmpDir);
            }
        }
        let absoluteLink = tmpDir + '/' + matchStr;
        //如果图片路径中不包含../, 并且不是绝对路径，直接拼接，得到绝对路径
        let tmpStr = match[0].replace(/[\"\']/, '')
        //根据当前文件所在目录，获取第三个/之前的部分，就是/Users/用户名
        let indexPic = tmpDir.indexOf('/');
        for (let i = 0; i < 2; i++) {
            indexPic = tmpDir.indexOf('/', indexPic + 1);
        }
        if (indexPic === -1) {
            console.log('错误：图片绝对路径中没找到项目路径——' + originPic);
            return
        }
        let username = tmpDir.substring(0, indexPic)
        console.log('xxxxxxxxxxxxxxxxxxxxxxxusername：' + username);
        if (tmpStr.indexOf('../') === -1 && matchStr.indexOf(username) === -1) {
            absoluteLink = tmpDir + matchStr;
        }
        if (matchStr.indexOf(username) !== -1) {
            absoluteLink = matchStr;
        }
        console.log('************absoluteLink：' + absoluteLink);
        //将图片绝对路径存入列表
        res.push(absoluteLink)
        // 将图片相对路径替换为绝对路径，并保存到当前文件
        newStr = newStr.replace(match[0].replace(/[\"\']/g, ''), absoluteLink)
        let writeFile = fs.openSync(filePath, 'w');
        fs.writeFileSync(writeFile, newStr);
        fs.closeSync(writeFile);
    }
    return res
}

//读取文件内容，处理图片链接（换成绝对路径）
let ProessFilePictureLink = function (filePath) {
    console.log('开始处理——' + filePath);
    let data = fs.readFileSync(filePath);
    let dataString = data.toString();
    //匹配图片路径
    let picRegExp = new RegExp("\".*\.jpg\"|\".*\.png\"|\'.*\.jpg\'|\'.*\.png\'", "g");
    let picLinkArr = matchAll(filePath, dataString, picRegExp);
    for (let i in picLinkArr) {
        console.log('图片绝对路径——' + picLinkArr[i]);
        picLinkArrAll.push(picLinkArr[i])
    }
}
// 图片上传阿里云，并获取图片地址
let client = new OSS({
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
});

/**
 * 
 * @param {*} originPic 
 * @param {*} picLinkArrAllAli 
 *  originPic = /Users/hehuiyun/hhy/project/H5/src/assets/img/audio/play_btn_3x.png
 *  projectRootDirectory = /Users/hehuiyun/hhy/project/H5
    projectName = H5
 */
let UploadPicToAli = async function (originPic, picLinkArrAllAli) {
    try {
        //获取图片绝对路径中的第三个/之后的部分，作为阿里云图片地址，不要的部分是/Users/电脑用户名
        // let indexPic = originPic.indexOf('/');
        // for (let i = 0; i < 2; i++) {
        //     indexPic = originPic.indexOf('/', indexPic + 1);
        // }
        // if (indexPic === -1) {
        //     console.log('错误：图片绝对路径中没找到项目路径——' + originPic);
        //     return
        // }
        // let shortOriginPic = originPic.substring(indexPic + 1);
        // shortOriginPic从项目名称开始生成
        let shortOriginPic = projectName + originPic.replace(projectRootDirectory,'');
        
        let hash = crypto.createHash('md5');
        // let stream = fs.createReadStream(originPic);
        // await stream.on('data', async function(chunk) {
        let md5 = hash.update(originPic).digest('hex');
        shortOriginPic = shortOriginPic.replace('.',md5+'.');
        // });
        // 如果存在不上传需要替换
        //如果originPic对应的图片不存在时，会报错
        // if(await isExistFileInOSS(shortOriginPic)){
        //     console.log('文件已经存在:',shortOriginPic);
        // }else{
            let result = await client.put(shortOriginPic, originPic);
            console.log('ali---', result.url);
            // 将阿里云图片地址存入列表
            picLinkArrAllAli.push(result.url);
        // } 
    } catch (e) {
        console.log('该绝对路径下没有图片，请检查其对应的相对路径是否正确！');
        console.log(e);
    }
}

/**
 * 在上传前需要判断文件是否存在，如果存在就不上传了
 * 'bankCard/bankCards4.png'
 */
async function isExistFileInOSS(objectName){
    // 必须加上try-catch，如果图片不存在会报错
    try {
        let result = await client.get(objectName);
        if(result.res.status == 200){
            return true
        }
    } catch(e) {
        if (e.code == 'NoSuchKey'){
            return false
        }
    }
}

let getAliPicLink = async function (filename) {
    // 所有的图片都上传阿里云
    for (let i in picLinkArrAll) {
        console.log('图片绝对路径——' + picLinkArrAll[i]);
        await UploadPicToAli(picLinkArrAll[i], picLinkArrAllAli)
    }
}

// 使用阿里云地址替换所有文件中所有的绝对路径
let replacePicLink = async function (filename) {
    // 4、把图片清单中的所有图片上传阿里云，获取链接
    await getAliPicLink()
    console.log('picLinkArrAllAli:',picLinkArrAllAli);
    // 5、用阿里云链接，替换所有绝对链接
    console.log('\n——————————————————————下面文件中的图片路径均已替换为阿里云链接：');
    for (let k in filePathArr) {
        console.log(filePathArr[k]);
        let tmpFile = filePathArr[k];
        let data = fs.readFileSync(tmpFile);
        let dataString = data.toString();
        // 图片绝对路径与阿里云路径必须一一对应，否则替换就会错乱
        if (picLinkArrAll.length === picLinkArrAllAli.length) {
            for (let p in picLinkArrAllAli) {
                dataString = dataString.replace(picLinkArrAll[p], picLinkArrAllAli[p])
            }
            // 保存到文件
            let writeFile = fs.openSync(tmpFile, 'w');
            fs.writeFileSync(writeFile, dataString);
            fs.closeSync(writeFile);
        } else {
            console.log('图片绝对路径数量与阿里云路径数量不相等，请检查是否有图片地址无实体文件！');
        }
    }
}



/**
 * 该程序用于自动将项目文件中所有图片的本地路径替换为阿里云图片链接，具体步骤：
 * 1、遍历所有文件vue、css、js、scss
 * 2、匹配jpg、png图片链接，不包含http开头的已经处理过的
 * 3、图片相对路径全部替换为绝对路径，并统计图片清单
 * 4、把图片清单中的所有图片上传阿里云，获取链接
 * 5、用阿里云链接，替换所有绝对链接
 */
/**
 * 替换dist文件中的图片
 * 检查本地图片文件大小
 */

//存储变量
let filePathArr = [];  //所有文件
let picLinkArrAll = [];  //所有文件的图片链接汇总
let picLinkArrAllAli = [];  //所有文件的ali图片链接汇总


// 1、遍历所有文件vue、scss、js
fileDisplaySync(specialFileDirectory, filePathArr);
console.log('\n共发现以下目标文件：');
for (let j in filePathArr) {
    console.log(filePathArr[j]);
}

// 2、匹配jpg、png图片链接，不包含http开头的已经处理过的
// 3、图片相对路径全部替换为绝对路径，并统计图片清单
for (let j in filePathArr) {
    ProessFilePictureLink(filePathArr[j])
}
//去掉重复的图片路径
picLinkArrAll = Array.from(new Set(picLinkArrAll))
// console.log('\n共发现以下图片链接：');
// for(let i in picLinkArrAll){
//     console.log('图片绝对路径——'+picLinkArrAll[i]);
// }

// 4、把图片清单中的所有图片上传阿里云，获取链接
// 5、用阿里云链接，替换所有绝对链接
console.log('\n共发现以下图片链接：');
replacePicLink()


class WebpackAliyunOss{
    constructor(options) {
		this.config = Object.assign({
			test: false, //测试，仅显示要上传的文件，但是不执行上传操作。默认false
			verbose: true, //是否显示上传日志，默认为true
			dist: '',//上传到oss哪个目录下，默认为oss根目录。可作为路径前缀使用。
			deleteOrigin: false, //上传完成是否删除原文件，默认false
			deleteEmptyDir: false, //如果某个目录下的文件都上传到cdn了，是否删除此目录。deleteOrigin为true时候生效。默认false。
			timeout: 30 * 1000, //oss超时设置，默认为30秒(30000)
			setOssPath: null,//自定义上传路径的函数。接收参数为当前文件路径。不传，或者所传函数返回false则按默认路径上传。(默认为output.path下文件路径)
			setHeaders: null //配置headers的函数。接收参数为当前文件路径。不传，或者所传函数返回false则不设置header
		}, options);

		this.configErrStr = this.checkOptions(options);
    }
    apply(compiler) {
		if (compiler) {
			this.doWithWebpack(compiler);
		} else {
			this.doWidthoutWebpack();
		}
    }
     
    /**
     * // path.sep:将特定文字分隔符 ‘\\' 或 ‘/' 的字符串转换成数组对象。
     * foo/bar/baz'.split(path.sep)
        // returns
        ['foo', 'bar', 'baz']
       shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
       pop() 方法用于删除并返回数组的最后一个元素。
    */
    //     from: [ './dist/**', '!./dist/**/*.html' ]
    doWithWebpack(compiler) {
        compiler.hooks.afterEmit.tapPromise('WebpackAliyunOss', (compilation) => {
            if (this.configErrStr) {
				compilation.errors.push(new Error(this.configErrStr));
				return Promise.resolve();
            }
            const outputPath = compiler.options.output.path;
            
           
            const {
				from = outputPath + (outputPath.endsWith(path.sep) ? '' : path.sep) + '**',
				verbose
            } = this.config;
            // const files = this.getFiles(from);
            if (filePathArr.length) {
                console.log('doWithWebpack--',filePathArr);
                // 上传到阿里云和替换链接
                this.upload(filePathArr, true, outputPath);
            }else {
                verbose && console.log('no files to be uploaded');
                return Promise.resolve();
            }
            return Promise.resolve();
        });
        
    }
    doWidthoutWebpack() {
        console.log('doWidthoutWebpack');
        if (this.configErrStr) return Promise.reject(new Error(this.configErrStr));

		const { from, verbose } = this.config;
		const files = filePathArr;

		if (filePathArr.length) {
            console.log('doWidthoutWebpack--',filePathArr);
            // 上传到阿里云和替换链接
            this.upload();
        }else {
            verbose && console.log('no files to be uploaded');
            return Promise.resolve();
        }
        return Promise.resolve();
    }

    upload(files, inWebpack, outputPath='') {
        return new Promise((resolve, reject) => {
            const o = this;
            const splitToken = inWebpack ? path.sep + outputPath.split(path.sep).pop() + path.sep : '';
            console.log('splitToken',splitToken); // /dist/
            // 为什么会进入死循环，要处理的文件： /Users/hehuiyun/hhy/project/H5/src/views/homeActivity/activityToPullNew.scss
            // for (let j in filePathArr) {
            //     ProessFilePictureLink(filePathArr[j])
            // }
            // picLinkArrAll = Array.from(new Set(picLinkArrAll))            
            // console.log('\n共发现以下图片链接：');
            // replacePicLink()
        })
    }
    getFiles(exp) {
		
    }
    
    checkOptions(options = {}) {
		const {
			from,
			region,
			accessKeyId,
			accessKeySecret,
			bucket
		} = options;

		let errStr = '';

		if (!region) errStr += '\nregion not specified';
		if (!accessKeyId) errStr += '\naccessKeyId not specified';
		if (!accessKeySecret) errStr += '\naccessKeySecret not specified';
		if (!bucket) errStr += '\nbucket not specified';

		if (Array.isArray(from)) {
			if (from.some(g => typeof g !== 'string')) errStr += '\neach item in from should be a glob string';
		} else{
			let fromType = typeof from;
			if (['undefined', 'string'].indexOf(fromType) === -1) errStr += '\nfrom should be string or array';
		}

		return errStr;
    }
}

module.exports = WebpackAliyunOss;



