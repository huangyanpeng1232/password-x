# password-x

&emsp;&emsp;password-x 是一个非常安全且强大的开源密码管理项目，采用阿里云对象存储服务作为数据仓库，支持静态页面部署，无需云服务器即可直接使用。

&emsp;&emsp;支持保存各种网站、服务器、数据库、应用等密码，内置的的密码生成器可以帮您快速生成安全性较高的随机密码，支持密码分组功能帮您归类整理不同场景不同类型的密码。

#### 演示地址
https://password-x.gitee.io

#### 系统框架简介
&emsp;&emsp;password-x 基于 vite + vue3 + element plus 等主流框架搭建，稳定性强，页面美观，使用了vue router进行路由管理，密码文件通过AES对称加密技术处理安全性高、速度快，用户的oss、主密码等关键配置信息使用浏览器指纹加密后存储在localStorage中充分保障密码安全。

#### 安全性
&emsp;&emsp;password-x 默认使用阿里云对象存储服务作为数据库，用户自行在阿里云开通对象存储服务后使用存储桶配置信息即可登录password-x，后续保存的密码均通过用户主密码加密后存储在阿里oss中，他人无法获取密码文件，即使阿里云密钥泄露或被他人截获密码文件也只能获取到未解密的密码，无主密码情况下无法解密查看，充分保护使用者密码安全。

#### 稳定性
&emsp;&emsp;
password-x 支持静态页面部署，如Gitee Pages、Github Pages或nginx、tomcat服务甚至直接部署到阿里oss、腾讯cos也可直接使用，数据存储方面对接阿里云oss，每人5GB免费额度足够保存各种密码，还支持文件版本控制功能，如您想进一步降低数据丢失隐患，可开启阿里云跨区域复制服务，计费请参考阿里云官网。

#### 页面展示
![首页](/doc/images/首页.png)
![登录页](/doc/images/登录页.png)
![设置页](/doc/images/设置页.png)
![暗黑模式首页](/doc/images/首页-暗黑模式.png)
![英文版首页](/doc/images/首页-英语.png)

### 即将支持的功能
- 配置信息token导出
- 对接腾讯云cos存储
- 导入/导出密码列表
- 密码文件压缩

### 作者微信
![首页](https://hyp-admin.oss-cn-beijing.aliyuncs.com/password-x/%E4%BD%9C%E8%80%85%E5%BE%AE%E4%BF%A1.png)

欢迎各位大佬指点，禁止用于商业用途