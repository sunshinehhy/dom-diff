**2017.12.08**
 ## Audio File Stream Services：
&nbsp;&nbsp;&nbsp;&nbsp;音频文件流本质上不是随机访问。当您从流中请求数据时，早期的数据可能不再是可访问的，稍后的数据可能还没有可用。此外，您获得的数据(然后提供给解析器)可能包括部分数据包。为了解析流音频数据，解析器必须记住部分满足的请求的数据，并且必须能够等待该数据的其余部分。换句话说，解析器必须能够在需要时暂停解析，然后恢复其停止的地方。

&nbsp;&nbsp;&nbsp;&nbsp;要使用解析器，您可以将来自流音频文件的数据传递给解析器。<font color="red">当解析器拥有完整的音频数据包或完整的属性时，它将调用一个回调函数。您的回调然后处理已解析的数据，例如通过播放或将其写入磁盘。</font>

&nbsp;&nbsp;&nbsp;&nbsp;`在这里，在outline表单中，是音频文件流解析器的典型使用模式:`
1. 通过调用AudioFileStreamOpen(_:_:_:_:)函数创建一个新的音频文件流解析器。为音频数据和元数据的回调函数传递指针(AudioFileStream_PacketsProc和AudioFileStream_PropertyListenerProc)。函数的作用是:为新解析器提供一个引用。
2. 获得一些流数据。调用AudioFileStreamParseBytes(_:_ _ _:)函数当你有数据传递给解析器。将数据按顺序发送给解析器，如果可能的话，没有空格。

    当解析器获得一个可用的音频数据缓冲区时，它将调用您的音频数据回调。你的回调可以播放数据，把它写入文件，或者处理它。

    当解析器获取元数据,它调用你的属性回调-此回调通过调用AudioFileStreamGetPropertyInfo(_:_ _ _:)和AudioFileStreamGetProperty(_:_ _ _:)功能反过来可以获得属性值。

3. 当完成对流的解析时，调用AudioFileStreamClose(_:)函数来关闭和释放解析器。
### 音频文件流服务支持以下音频数据类型:
- AIFF
- AIFC
- WAVE
- CAF
- NeXT
- ADTS
- MPEG Audio Layer 3
- AAC

### 相关函数
1. func AudioFileStreamOpen()
创建并打开一个新的音频文件流解析器。
func AudioFileStreamOpen(_ inClientData: UnsafeMutableRawPointer?, _ inPropertyListenerProc: @escaping AudioFileStream_PropertyListenerProc, _ inPacketsProc: @escaping AudioFileStream_PacketsProc, _ inFileTypeHint: AudioFileTypeID, _ outAudioFileStream: UnsafeMutablePointer<AudioFileStreamID?>) -> OSStatus

inClientData
传递给回调函数的值或结构的指针。

inPropertyListenerProc
你的property-listener回调。当解析器发现一个属性的值在数据流,它调用你的带有属性ID的属性侦听器。你可以调用AudioFileStreamGetPropertyInfo(_:_ _ _:)和AudioFileStreamGetProperty(_:_ _ _:)函数来获得属性值。

inPacketsProc
你的音频数据的回调。每当解析器在数据流中查找音频数据包时，它将数据传递给您的audio数据回调。

inFileTypeHint
一个音频文件类型提示。如果您想传递给解析器的音频文件流是解析器不能很容易地或惟一地从数据中确定的类型(比如ADTS或AC3)，您可以使用此参数来指示类型。在音频文件服务的AudioFileTypeID枚举中列出了可能的值。
如果您不知道音频文件类型，请传递值为0。

outAudioFileStream
在输出上，一个表示音频文件流解析器的不透明对象。这个对象在本文档中称为音频文件流解析器ID，您需要将该ID传递给音频文件流API中的其他函数。
2. func AudioFileStreamParseBytes(_:_ _ _:)
将音频文件流数据传递给解析器。
func AudioFileStreamParseBytes(_ inAudioFileStream: AudioFileStreamID, _ inDataByteSize: UInt32, _ inData: UnsafeRawPointer?, _ inFlags: AudioFileStreamParseFlags) -> OSStatus

inAudioFileStream
您希望传递数据的解析器的ID。该解析器ID由AudioFileStreamOpen(_:_:_:_:)函数返回。

inDataByteSize
要解析的数据字节数。

inData
要解析的数据。

inFlags
一个音频文件流标志。如果您传递给解析器的最后一个数据有一个不连续性，则设置中断标志。

讨论
流音频文件数据，与它在音频文件中出现的相同序列，从音频文件流的开始，没有间隔，将被传递给解析器。然而,如果你调用AudioFileStreamSeek(_:_ _ _:)函数,解析器假定数据传递到AudioFileStreamParseBytes(_:_ _ _:)函数从AudioFileStreamSeek(_:_ _ _:)函数返回的字节处开始。

当您向解析器提供数据时，解析器会查找属性数据和音频数据包，当它准备好数据时，调用AudioFileStream_PropertyListenerProc和AudioFileStream_PacketsProc回调函数来处理数据。您应该至少提供一个数据包的音频文件数据，但最好是提供每次几个数据包到几秒钟的数据。

3. func AudioFileStreamSeek(_:_ _ _:)
为数据流中的指定数据包提供一个字节偏移量。
func AudioFileStreamSeek(_ inAudioFileStream: AudioFileStreamID, _ inPacketOffset: Int64, _ outDataByteOffset: UnsafeMutablePointer<Int64>, _ ioFlags: UnsafeMutablePointer<AudioFileStreamSeekFlags>) -> OSStatus
inAudioFileStream
您希望提供一个字节偏移的解析器的ID。该解析器ID由AudioFileStreamOpen(_:_:_:_:)函数返回。
inAbsolutePacketOffset
从包文件开始的数据包的数量，这些包是你希望返回的字节偏移。
outAbsoluteByteOffset
在输出中，包的绝对字节偏移量，它是在inabsolute tepacketoffset参数中指定的偏移量（或者翻译为它的偏移量是在inabsolute tepacketoffset参数中指定的）。对于不包含包表的音频文件格式，返回的偏移量可能是一个估计值。
ioFlags
在输出中，如果outAbsoluteByteOffset参数返回一个估计值，则该参数将返回常量kAudioFileStreamSeekFlag_OffsetIsEstimated。目前，这个调用没有定义输入标志。
讨论
当你调用这个函数,解析器假定传递到AudioFileStreamParseBytes(_:_ _ _:)函数的下一个数据，从outAbsoluteByteOffset参数返回的字节偏移量开始。

4. func AudioFileStreamGetPropertyInfo(_:_ _ _:)
检索有关属性值的信息。
func AudioFileStreamGetPropertyInfo(_ inAudioFileStream: AudioFileStreamID, _ inPropertyID: AudioFileStreamPropertyID, _ outPropertyDataSize: UnsafeMutablePointer<UInt32>?, _ outWritable: UnsafeMutablePointer<DarwinBoolean>?) -> OSStatus

inAudioFileStream
您希望获取信息的解析器的ID。该解析器ID由AudioFileStreamOpen(_:_:_:_:)函数返回。

inPropertyID
一个四字符的ID，表示您想要信息的音频文件流属性。查看音频文件流属性以获得可能的值。

outPropertyDataSize
在输出上，指定属性的当前值的大小，以字节为单位。

outWritable
在输出上，如果属性可以被写入，为true。目前，没有可写的音频文件流属性。

5. func AudioFileStreamGetProperty(_:_ _ _:)
检索指定属性的值。
func AudioFileStreamGetProperty(_ inAudioFileStream: AudioFileStreamID, _ inPropertyID: AudioFileStreamPropertyID, _ ioPropertyDataSize: UnsafeMutablePointer<UInt32>, _ outPropertyData: UnsafeMutableRawPointer) -> OSStatus
inAudioFileStream
您希望获取数据的解析器的ID。该解析器ID由AudioFileStreamOpen(_:_:_:_:)函数返回。

inPropertyID
一个四字符的ID，表示您想要阅读的音频文件流属性。查看音频文件流属性以获得可能的值。

ioPropertyDataSize
输入时，在outPropertyData参数中缓冲区的大小。调用AudioFileStreamGetPropertyInfo(_:_ _ _:)函数来获取属性值的大小。在输出上，属性值返回的字节数。

outPropertyData
在输出上，指定属性的值。

讨论
一些核心的音频属性值是C类型，而其他的是Core Foundation对象。

如果调用此函数来检索一个核心基础对象的属性值，然后该函数—尽管使用“Get”在其名称—复制此对象。您负责释放该对象，正如在核心基础的内存管理编程指南中所描述的那样。

6. func AudioFileStreamSetProperty(_:_ _ _:)
设置指定属性的值。
func AudioFileStreamSetProperty(_ inAudioFileStream: AudioFileStreamID, _ inPropertyID: AudioFileStreamPropertyID, _ inPropertyDataSize: UInt32, _ inPropertyData: UnsafeRawPointer) -> OSStatus

inAudioFileStream
您希望传递数据的解析器的ID。该解析器ID由AudioFileStreamOpen(_:_:_:_:)函数返回。

inPropertyID
该音频文件流属性的ID，其值将被设置。

inPropertyDataSize
属性数据的字节大小。

inPropertyData
属性数据。

讨论
目前，没有可设置的属性。

7. func AudioFileStreamClose(_)
关闭并分配指定的音频文件流解析器。
func AudioFileStreamClose(_ inAudioFileStream: AudioFileStreamID) -> OSStatus
inAudioFileStream
您希望关闭的解析器的ID。该解析器ID由AudioFileStreamOpen(_:_:_:_:)函数返回。

###Callbacks
类型别名
1.AudioFileStream_PropertyListenerProc
当它在音频文件流中找到一个属性值时，由音频文件流解析器调用。
typealias AudioFileStream_PropertyListenerProc = (UnsafeMutableRawPointer, AudioFileStreamID, AudioFileStreamPropertyID, UnsafeMutablePointer<AudioFileStreamPropertyFlags>) -> Void
inClientData
当您调用AudioFileStreamOpen(_:_:_:_:)函数时，您在inClientData参数中提供的值。
inAudioFileStream
调用回调的音频文件流解析器的ID。该解析器ID由AudioFileStreamOpen(_:_:_:_:)函数返回。
inPropertyID
在音频文件数据流中发现的属性的四字符ID。查看音频文件流属性以获得可能的值。
ioFlags
在输入,如果kAudioFileStreamPropertyFlag_PropertyIsCached值设置,解析器缓存属性值。如果没有设定,输出时可以设置kAudioFileStreamPropertyFlag_CacheProperty flag上去使解析器缓存值。参见音频文件流标志。
讨论
如果您将函数命名为MyAudioFileStream_PropertyListenerProc，则可以这样声明:
当解析器调用您的属性侦听器时，检查ioFlags值，看看是否缓存了属性值。如果没有,你可以调用AudioFileStreamGetPropertyInfo(_:_ _ _:)和AudioFileStreamGetProperty(_:_ _ _:)函数去获得来自属性侦听器的属性值,或者你可以在返回中设置kAudioFileStreamPropertyFlag_CacheProperty flag使解析器缓存值。

在某些情况下当你从属性侦听器中，调用AudioFileStreamGetProperty(_:_ _ _:)函数,因为输入数据的边界,解析器返回结果代码“kAudioFileStreamError_DataUnavailable”意味着值是没有可用的。当从属性侦听器中请求不可用数据时，解析器开始缓存属性值，并在属性值可用时再次调用属性侦听器。如果没有设置kAudioFileStreamPropertyFlag_PropertyIsCached flag,这是你唯一获取属性值的机会, 当属性监听器回调返回时，数据会被处理。

2.AudioFileStream_PacketsProc
当它在音频文件流中找到音频数据时，由音频文件流解析器调用。
typealias AudioFileStream_PacketsProc = (UnsafeMutableRawPointer, UInt32, UInt32, UnsafeRawPointer, UnsafeMutablePointer<AudioStreamPacketDescription>) -> Void
inClientData
当您调用AudioFileStreamOpen(_:_:_:_:)函数时，您在inClientData参数中提供的值。
inNumberBytes
inInputData缓冲区中数据的字节数。
inNumberPackets
inInputData缓冲区中音频数据的包数。
inInputData
音频数据。
讨论
如果你给你的函数命名为MyAudioFileStream_PacketsProc，你可以这样声明:
constant-bit-rate(CBR)音频数据,你回调通常被称为与尽可能多的数据传递到AudioFileStreamParseBytes(_:_ _ _:)功能。然而，有时由于输入数据的边界，可能仅仅会传递一个数据包。可变比特率(VBR)音频数据,你的回调可能多次被调用 当每次调用AudioFileStreamParseBytes(_:_ _ _:)函数。

###Data Types
typealias AudioFileStreamID
定义表示音频文件流解析器的不透明数据类型。

##AVAudioSession
让你打算如何在你的应用程序中使用音频的。一个音频会话与系统沟通。

执行先进的音频设备配置，例如设置采样率、I / O缓冲区的持续时间和通道数。

###Accessing the Audio Session
访问您的应用程序的单例音频会话实例来配置它的类别、模式和首选设备设置。
class func sharedInstance()
返回共享的音频会话实例。

###Configuring the Audio Session
通过设置应用程序的类别、选项和模式来配置应用程序的音频会话。设置一个音频会话类别可以让您从语义上显示应用程序需要的一般行为，例如回放或录制，但将这些行为的管理委托给音频会话。有些类别可以通过使用类别选项和模式进行进一步的定制，这些选项和模式提供了对特定类别提供的一般音频行为的更细粒度的控制。
###Activating the Audio Session
通常，在激活会话之前设置类别和模式。您还可以在会话活动时设置类别或模式，但这会导致立即更改。
    AVAudioSessionCategoryAmbient：一个声音回放的应用程序的类别是不是主要的——也就是说，你的应用程序可以在声音关闭的时候成功使用。
这个类别也适用于“玩”风格的应用程序，比如在音乐应用程序播放时，用户播放的虚拟钢琴。当你使用这个类别时，来自其他应用的音频与你的音频混合。你的音频被屏幕锁定和无声开关(电话呼叫/无声开关)屏蔽。
    AVAudioSessionCategorySoloAmbient：默认的音频会话类别。你的音频被屏幕锁定和无声开关(电话呼叫/无声开关)屏蔽。
    AVAudioSessionCategoryPlayback：播放录制音乐或其他声音的类别，这些声音对于你的应用程序的成功使用至关重要。
当使用这个类别时，你的应用程序音频会继续保持静默切换设置为静默或屏幕锁定。(这个开关被称为iPhone上的环/静音开关。)当应用程序转换到后台时，继续播放音频(例如，当屏幕锁定时)，将音频值添加到信息属性列表文件中的uibackground模式密钥中。
默认情况下，使用这个类别意味着您的应用程序的音频是不可混合的，您的会话将中断任何其他非混合的音频会话。要允许混合使用此类别，请使用其他选项。
AVAudioSessionCategoryRecord：录音音频的分类;这个类别沉默回放音频。
AVAudioSessionCategoryRecord：只要会话是活动的，这个类别就会对系统上几乎所有的输出保持沉默。除非你需要防止任何意外的声音,建议你用AVAudioSessionCategoryPlayAndRecord。当应用程序转换到后台时，继续录制音频(例如，当屏幕锁定时)，将音频值添加到信息属性列表文件中的uibackground模式密钥中。
AVAudioSessionCategoryPlayAndRecord：音频的录制(输入)和回放(输出)的类别，如VoIP(互联网协议语音)应用。
   你的音频继续保持沉默切换设置为静音和屏幕锁定。(这个开关被称为iPhone上的环/静音开关。)当应用程序转换到后台时，继续播放音频(例如，当屏幕锁定时)，将音频值添加到信息属性列表文件中的uibackground模式密钥中。
   ####Audio Session Categories

###Requesting Permission to Record

```
音频进度条更新2种方法：
    @objc func changeSlider(_ sender: UISlider) {
        var currentValue = sender.value
        if let playerItem = TabBarAudioContent.sharedInstance.playerItem {
            print("current time:\(playerItem.currentTime)")
            let d = playerItem.duration
            currentValue = currentValue*Float(CMTimeGetSeconds(d))
            let currentTime = CMTimeMake(Int64(currentValue), 1)
            playerItem.seek(to: currentTime)
            print("sliderValueChanged button\(currentTime)")
        }
//        let currentTime = CMTimeMake(Int64(currentValue), 1)
//        TabBarAudioContent.sharedInstance.playerItem?.seek(to: currentTime)
//        print("sliderValueChanged button\(currentTime)")
        
    }
    var timer: Timer?
    @objc func updateMiniPlay(){
        //        print("How many times updateMiniPlay observe run?")
        self.isHidden = false
        if let item = TabBarAudioContent.sharedInstance.item{
            player = TabBarAudioContent.sharedInstance.player
            self.playStatus.text = item.headline
            timer = nil; //必须要，类似于清空观察器
            timer = Timer.scheduledTimer(timeInterval: 0.05, target: self, selector: #selector(updateProgressSlider), userInfo: nil, repeats: true)
            if let timer = timer{
                timer.fire()
            }
            
            updatePlayButtonUI()
        }
    }
@objc func updateProgressSlider(){
        
        //  方法一：此方式不用一直监听，一直监听消耗大量内存
        if let playerItem = TabBarAudioContent.sharedInstance.playerItem {
            print("current time:\(playerItem.currentTime)")
            let d = playerItem.duration
            let time = playerItem.currentTime()
            let duration = CMTimeGetSeconds(d)
            if duration.isNaN == false {
                self.progressSlider.maximumValue = 1.0   
                if self.progressSlider.isHighlighted == false {
                    self.progressSlider.value = Float((CMTimeGetSeconds(time))/(CMTimeGetSeconds(d)))
                }
                self.updatePlayTime(current: time, duration: d)
                TabBarAudioContent.sharedInstance.duration = d
                TabBarAudioContent.sharedInstance.time = time
            }
        }
    
         //  方法二：使用监听
        // MARK: - Update audio play progress
//        player?.addPeriodicTimeObserver(forInterval: CMTimeMakeWithSeconds(1/30.0, Int32(NSEC_PER_SEC)), queue: nil) { [weak self] time in
//            if let d = TabBarAudioContent.sharedInstance.playerItem?.duration {
//                let duration = CMTimeGetSeconds(d)
//                if duration.isNaN == false {
//                    self?.progressSlider.maximumValue = Float(duration)
//                    if self?.progressSlider.isHighlighted == false {
//                        self?.progressSlider.value = Float((CMTimeGetSeconds(time)))
//                    }
//                    self?.updatePlayTime(current: time, duration: d)
//                    TabBarAudioContent.sharedInstance.duration = d
//                    TabBarAudioContent.sharedInstance.time = time
//                }
//            }
//        }
    }
    一点开播放就特别耗cpu
```


## 看crash log
You did not supply a reference to an object returned by either -addPeriodicTimeObserverForInterval:queue:usingBlock: or -addBoundaryTimeObserverForTimes:queue:usingBlock:'

一定要如以下方式定义，必须调用removeTimeObserver才不会卡顿:

private lazy var timeObserver: Any? = {return nil} ()
 player?.removeTimeObserver(timeObserver as Any)  
 timeObserver = player?.addPeriodicTimeObserver(forInterval: CMTimeMakeWithSeconds(1/30.0, Int32(NSEC_PER_SEC)), queue: nil) { [weak self] time in}

## 基本概念
 PCM：脉冲编码调制
通道是单声道音频的离散轨迹。单声道流有一个通道;立体声流有两个通道（channel）。
一个音频样本是单个音频通道的单一数值。
一个音频帧是时间重合的样本的集合。例如，立体声文件每帧有两个样本，一个用于左声道，一个用于右声道。
一个音频包是一个或多个连续的帧的集合。数据包定义了给定音频数据格式的最小的有意义的帧，并且是可以度量时间的最小的数据单位。在线性PCM音频中，音频包始终是单个帧。在压缩格式中，一般是多个帧。在给定的音频格式中，音频包定义了最小且具有意义的一组音频帧的集合。
流的采样率是未压缩(或压缩格式，相当于解压)音频的每秒帧数。
http://www.jianshu.com/p/1f92ee874613  （音频流分析）