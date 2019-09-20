https://ruby-china.github.io/rails-guides/asset_pipeline.html  (asset_pipeline)

Asset Pipeline 提供了用于连接、简化或压缩 JavaScript 和 CSS 静态资源文件的框架。有了 Asset Pipeline，我们还可以使用其他语言和预处理器，例如 CoffeeScript、Sass 和 ERB，编写这些静态资源文件。应用中的静态资源文件还可以自动与其他 gem 中的静态资源文件合并。例如，与 jquery-rails gem 中包含的 jquery.js 文件合并，从而使 Rails 能够支持 AJAX 特性。

Asset Pipeline 是通过 sprockets-rails gem 实现的，Rails 默认启用了这个 gem。在新建 Rails 应用时，通过 --skip-sprockets 选项可以禁用这个 gem。

https://blog.csdn.net/bajiudongfeng/article/details/51604697

Ruby on Rails 是一个用于`开发数据库驱动的网络应用程序的完整框架`。Rails基于MVC（模型- 视图- 控制器）设计模式。从视图中的Ajax应用，到控制器中的访问请求和反馈，到封装数据库的模型，Rails 为你提供一个纯Ruby的开发环境。发布网站时，你只需要一个数据库和一个网络服务器即可。

https://www.cnblogs.com/fanxiaopeng/p/4359543.html  (rails常用gem)

http://api.rubyonrails.org/ 
学习构建一个现代的web应用程序是一项艰巨的任务。Ruby on Rails让它变得更简单、更有趣。它包含了构建出色应用程序所需的所有内容，并且您可以在我们的大型友好社区的支持下学习它。
优化程序员的幸福与约定优于配置是我们如何滚动。Ruby on Rails从一开始就一直在推广这两个概念以及其他各种有争议的观点。要了解为什么Rails与许多其他web应用程序框架和范例如此不同，请研究Rails原则。

Rails是一个web应用程序框架，它包含根据模型-视图-控制器(MVC)模式创建数据库支持的web应用程序所需的一切。
理解MVC模式是理解Rails的关键。MVC将您的应用程序划分为三层，每个层都有特定的职责。

模型层表示域模型(如帐户、产品、人员、Post等)，并封装特定于应用程序的业务逻辑。在Rails中，数据库支持的模型类来自ActiveRecord::Base。Active Record 允许您将来自数据库行的数据显示为对象，并使用业务逻辑方法对这些数据对象进行修饰。你可以在它的自述中读到更多关于Active Record 的信息。虽然大多数Rails模型都由数据库支持，但是模型也可以是普通的Ruby类，或者是实现活动模型模块提供的一组接口的Ruby类。您可以在它的自述中阅读更多关于活动模型的内容。

控制器层负责处理传入的HTTP请求并提供适当的响应。通常这意味着返回HTML，但是Rails控制器也可以生成XML、JSON、PDFs、特定于移动的视图等等。控制器加载和操作模型，并呈现视图模板以生成适当的HTTP响应。在Rails中，通过动作分派将传入的请求路由到适当的控制器，控制器类由ActionController: Base派生。Action Dispatch和Action控制器被打包在Action Pack中。你可以在它的自述中阅读更多的动作包。
视图层由“模板”组成，它们负责提供应用程序资源的适当表示。模板可以有各种格式，但是大多数视图模板是带有嵌入Ruby代码(ERB文件)的HTML。视图通常用于生成控制器响应或生成电子邮件主体。在Rails中，视图生成由Action视图处理。你可以在它的自述中阅读更多关于动作视图的内容。

活动记录、活动模型、动作包和动作视图都可以在Rails之外独立使用。除此之外，Rails还附带了Action Mailer (README)，一个用于生成和发送电子邮件的库;活动作业(README)，用于声明作业并使它们在各种排队后端运行的框架;行动电缆(README)，集成WebSockets与Rails应用程序的框架;主动存储(README)，将云和本地文件附加到Rails应用程序的库;以及Active Support (README)，它是实用程序类和标准库扩展的集合，对Rails非常有用，也可以在Rails之外独立地使用。