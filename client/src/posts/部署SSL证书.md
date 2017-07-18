## 第一步：下载与安装

```bash
$ wget https://dl.eff.org/certbot-auto
$ chmod a+x ./certbot-auto
$ ./certbot-auto
```

## 第二步：生成证书

```bash
$ ./certbot-auto certonly --webroot -w /usr/local/nginx/html/blog.zhaoyuxiang.cn/client/dist -d zhaoyuxiang.cn
```

## 第三步：配置Nginx

```nginx
server {
    listen 443;
    server_name zhaoyuxiang.cn;
    ssl on;
    ssl_certificate /etc/letsencrypt/live/zhaoyuxiang.cn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/zhaoyuxiang.cn/privkey.pem;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; #按照这个套件配置
    ssl_prefer_server_ciphers on;
    location / {
        root   html/blog.zhaoyuxiang.cn/client/dist;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}

# 访问http自动跳转
server {
    listen 80;
    server_name zhaoyuxiang.cn;
    return 301 https://$server_name$request_uri;
}
```

如果提示：

> nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module in /usr/local/nginx/conf/nginx.conf:100

则需要开启nginx的SSL模块：

进入源码包：

```bash
$ cd /nginx-1.12.0
```

配置SSL模块：

```bash
$ ./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
```

运行：

```bash
$ make
```

将编译好的nginx覆盖掉原有的nginx：

```bash
$ cp ./objs/nginx /usr/local/nginx/sbin/
```

提示：

> cp: overwrite ‘/usr/local/nginx/sbin/nginx.bak’?  // 输入yes

如果提示：

> cp: cannot create regular file ‘/usr/local/nginx/sbin/nginx’: Text file busy


则使用命令：

```bash
$ cp -rfp ./objs/nginx /usr/local/nginx/sbin/
```

查看新的配置是否加入成功：

```bash
$ /usr/local/nginx/sbin/nginx -V
```

显示：

> nginx version: nginx/1.12.0  
> built by gcc 4.8.5 20150623 (Red Hat 4.8.5-11) (GCC)  
> built with OpenSSL 1.0.1e-fips 11 Feb 2013  
> TLS SNI support enabled  
> configure arguments: --with-http_stub_status_module --with-http_ssl_module

则配置成功。

## 第四步：重启Nginx

```bash
$ /usr/local/nginx/sbin/nginx -s reload
```
