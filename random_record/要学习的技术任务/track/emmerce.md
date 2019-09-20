https://www.simoahava.com/analytics/attribution-enhanced-ecommerce-reports/

产品列表属性仅适用于产品SKU(“id”)。它不能使用产品名称(“Name”)。这是一个非常重要的区别，因为增强电子商务的开发人员文档要求每个产品负载都包含“id”或“name”，但如果您希望产品列表属性发挥作用，则有效负载必须共享“id”值。

以下是产品列表属性的工作原理:

如您所见，list属性只添加到Add to Cart操作中。尽管如此，所有针对相同产品ID的后续操作都被归结为列表。这就是为什么在搜索结果列表中，您会看到1个产品签出和1个唯一的购买，即使这个列表属性不是在结算或购买操作中被推动的。

在这里，Actions意味着以下增强的电子商务攻击类型:

换句话说，如果您发送带有这些有效负载中的任何一个的list属性，它将在同一会话中通过所有后续增强的电子商务操作而持续存在。但是，如果在随后的操作中发送另一个list属性，那么当前属性链将会断裂，新的列表将会因为后面的操作而获得所有的荣誉。

https://developers.google.cn/analytics/devguides/collection/ios/v3/enhanced-ecommerce?hl=zh-cn#measuring-transactions

https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn