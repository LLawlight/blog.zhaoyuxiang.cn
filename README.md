# 开发笔记

## client

### vue-resource

1. post时data默认是request payload而不是form data，需设置。
```js
Vue.http.options.emulateJSON = true;
```

2. 请求接口时如果要发送cookie，前端需要设置
```js
Vue.http.options.credentials = true
// or
Vue.http.interceptors.push((request, next) => {
  request.credentials = true;
  next();
});
```

### webpack

1. 在webpack-dev-server中使用hot，output中不应该使用[chunkhash]，否则编译失败。（实际上在开发模式下都不应该使用hash）
> webpack-dev-server[issues#377]: Because you should not use [chunkhash] or [hash] for development. This will cause many other issues, like a memory leak, because the dev server does not know when to clean up the old files.

2. output中的publicPath要写为'/'，为空的情况下，资源路径会直接从当前路径进行拼接，刷新大于等于二级的路径后加载资源造成404。

## server

1. req.body一定是post请求，express里依赖的中间件必须有bodyParser，不然req.body是没有的。
```js
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
```

2. 针对vue-resource的credentials，后端需要设置
```js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '指定域名'); // 不能为'*'
  next();
})
```
