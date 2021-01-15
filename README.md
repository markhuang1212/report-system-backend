# Report System Backend Deployment

## 安装依赖

后端需要NodeJs v14（和NodeJs自带的包管理工具NPM）。在ubuntu中可以通过以下命令行安装。也可以直接在官网(https://nodejs.org/en/download/)下载`node`和`npm`的可执行程序(Linux Binary)。

```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 部署

1. 下载并解压项目源代码

2. 安装后端依赖
    ```sh
    npm i # 安装依赖
    npm run build # 编译
    ```

3.  配置运行端口。在`./env.json`的`port`中填入后端运行的端口。

4.  运行
    ```
    node build/index.js
    ```

用户上传的Bug描述和图片会储存在`./temp`文件夹中。

后台连接：http://ip:port/admin/:password/ 其中password为后台管理密码。

## 配置

### 多语言

默认支持英语(en)，简体中文(zh-CN)，繁体中文-香港(zh-HK)，繁体中文-台湾(zh-TW)。默认会根据当前浏览器环境决定语言。如果当前环境语言不支持，默认使用英语。

如果需要强制更改语言，可在url中加入`lng`参数。如`http://localhost:8080/bug_report/?lng=zh-CN`

### 后台管理密码

在`./env.json`的`password`中填入后台管理密码

### CORS

后台API默认接收任何Origin（`"Access-Control-Allow-Origin: *"`）。可在`env.json`中的`CORS`中改变。