http://10.148.126.11:8100/ftc-user/profile/9270d53f-ac4b-4184-afae-42cacce12193
得到：
```
{"id":"9270d53f-ac4b-4184-afae-42cacce12193","name":"hhy1770547592","email":"hhy1770547592@163.com","gender":"M","familyName":null,"givenName":null,"phoneNumber":"00000000","mobileNumber":null,"birthdate":"1980-01-01","address":null,"zipCode":null,"createdAt":"2016-12-27T11:32:24+08:00","updatedAt":"2016-12-27T11:32:24+08:00","lastLoginAt":"2018-05-08T09:30:30+08:00"}
```

router.post('/myft/:id', myft.bind); 获取到myftEmail和password；再用myftEmail，从cms中找到userid（authMyft），则bindMyft

