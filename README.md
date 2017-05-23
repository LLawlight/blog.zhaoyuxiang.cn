# 开发笔记

## client

## server

1. req.body一定是post请求，express里依赖的中间件必须有bodyParser，不然req.body是没有的。
```js
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
```
