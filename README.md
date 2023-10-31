# password-x

&emsp;&emsp;password-x 是一款安全可靠且功能强大的开源密码管理项目，它采用阿里云对象存储服务作为数据仓库，支持静态页面部署，无需云服务器即可直接使用。

password-x 不仅支持保存各种网站、服务器、数据库、应用等密码，还内置了密码生成器，能够快速生成安全的随机密码。此外，它还支持密码分组功能，帮助您将不同场景和类型的密码进行归类整理。

通过使用 password-x，您可以轻松地管理和保护您的密码，确保您的信息安全无忧。无论是个人用户还是企业用户，password-x 都是一个理想的选择。

### 服务地址
https://password-x.gitee.io

阿里云OSS演示账号：[点我打开](https://password-x.gitee.io/login?type=oss&region=oss-cn-beijing&keyId=LTAI5tRPBc5sY6KbZd1Vc1jU&keySecret=4OORS9GloeAn2Jd4Tvluw1Lt0YIj21&bucket=password-x-demo)

腾讯云COS演示账号：[点我打开](https://password-x.gitee.io/login?type=cos&region=ap-beijing&keyId=AKID8BJDUZR7bu2xgR1MED0hDVbXGm43qPmw&keySecret=2vdHH7lBORIvTqyvjNp6EGBvWu7B9994&bucket=password-x-demo-1259440743)

主密码：456 或 图案密码:  
![](https://foruda.gitee.com/images/1698466035681541011/230bc1c8_9560465.png)

### 系统架构简介
&emsp;&emsp;password-x 是一款基于 Vite、Vue3 和 Element Plus 等主流框架精心打造的密码管理工具，稳定性卓越，页面设计美观大方。我们采用先进的 AES 对称加密技术对密码文件进行处理，确保安全性和速度的双重优势。

&emsp;&emsp;为了充分保障用户密码的安全，我们将用户的 OSS、主密码等关键配置信息通过浏览器指纹加密后存储在 localStorage 中。这样一来，即使黑客入侵，也无法轻易获取到用户的敏感信息。

### 安全性
- 使用阿里对象存储保存密码文件，不存在开发者泄露密码问题
- 密码文件经AES通过主密码加密，任何人在没有主密码情况下无法轻易破解
- 阿里oss、主密码信息通过浏览器指纹保存在本地缓存中，无法直接查看更无法复制使用
- 此项目为开源项目，在大家共同的监督下能防止恶意篡改源码盗取重要的密码数据
- 如果您想进一步保障面安全，可以关闭主密码缓存，这样每次打开密码页面都需要验证主密码后才可查看

### 可靠性
&emsp;&emsp;password-x 使用阿里云对象存储作为数据库保存密码文件
> 阿里云对象存储服务（Object Storage Service，简称 OSS）是一款可提供海量、安全、低成本、高可靠服务的云存储产品。其数据可靠性高达 99.9999999999%（12个9），这一数值代表的是其在一年内丢失数据的概率极低。同时，其服务可用性也达到了不低于 99.995%，确保用户可以随时随地访问存储的数据。

如您想进一步提升数据可靠性：
- 开启阿里云版本控制功能，即使密码不小心删除或者程序bug，您也可以随时恢复数据（会占用更多的存储空间）
- 开启阿里云跨区域复制功能（会产生少量费用）

### 部署方式
&emsp;&emsp;password-x 支持静态页面部署，如 Gitee Pages、Github Pages、Nginx、Tomcat，还可以直接部署到腾讯 Cos 静态页面服务中。

### 页面展示
![登录](https://foruda.gitee.com/images/1698639884126266512/2aabf75e_9560465.png)
![验证密码](https://foruda.gitee.com/images/1698714086606322110/a4f448e5_9560465.png)
![首页](https://foruda.gitee.com/images/1698713936750032841/6e0d1a55_9560465.png)
![编辑](https://foruda.gitee.com/images/1698714136725781723/e5752fdd_9560465.png)
![设置](https://foruda.gitee.com/images/1698714175075207907/bb9fa1e8_9560465.png)
![多语言](https://foruda.gitee.com/images/1698713962830229668/1157ff87_9560465.png)
![暗黑模式](https://foruda.gitee.com/images/1698714002636191301/4b3092f5_9560465.png)

### 开源地址
https://gitee.com/password-x/password-x


### 使用方法
请参考 阿里云账号操作指引文档

### 功能列表

- 多语言 √
- 暗黑模式 √
- 密码锁定 √
- 自动登录 √
- 密码分享 √
- 密码排序 √
- 修改主密码 √
- 注销账户 √
- 密码强度显示 √
- 导入/导出密码列表 √
- 手势主密码 √
- 对接腾讯云cos存储 √
- 毛玻璃背景 √
- 配置信息token导出（即将支持）
- 密码文件压缩（即将支持）
- 密钥文件（考虑中）


### 作者微信
如您有任何问题欢迎随时反馈
![作者微信](https://foruda.gitee.com/images/1697444535317416303/de05c1a5_9560465.png)

### 打赏
作为一个开源项目，在开发和维护过程中面临着诸多困难和挑战。为了能够持续为大家提供更好的服务，希望大家能够伸出援手，给予一些经济上的支持
![赞赏码](https://foruda.gitee.com/images/1697444547014836574/613e0117_9560465.png "屏幕截图")