// 腾讯云cos
import COS from 'cos-js-sdk-v5'
import store from "@/store/index.js";

let prefix = 'password-x/'

// 设置cos信息并验证是否正确
export async function login(form) {
    return new Promise((resolve, reject) => {

        const client = new COS({
            SecretId: form.keyId,
            SecretKey: form.keySecret,
        });

        client.getBucket(
            {
                Bucket: form.bucket,
                Region: form.region,
                Prefix: 'password-x/',
                MaxKeys: 1
            },
            function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(client)
                }
            }
        );
    })
}

// 上传文件
export function putFile(key, json) {
    return new Promise((resolve, reject) => {
        store.state.database.putObject({
            Bucket: store.state.databaseForm.bucket,
            Region: store.state.databaseForm.region,
            Key: prefix + key,
            Body: JSON.stringify(json),
        }, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

// 获取文件
export function getFile(key) {
    return new Promise((resolve, reject) => {
        store.state.database.getObject({
            Bucket: store.state.databaseForm.bucket,
            Region: store.state.databaseForm.region,
            Key: prefix + key,
        }, function (err, data) {
            if (data) {
                resolve(JSON.parse(data.Body))
            } else {
                if (err && err.statusCode !== 404) {
                    reject(err)
                } else {
                    resolve({})
                }
            }
        });
    })
}

// 删除文件
export function delFile(key) {
    return new Promise((resolve, reject) => {
        store.state.database.deleteObject({
            Bucket: store.state.databaseForm.bucket,
            Region: store.state.databaseForm.region,
            Key: prefix + key,
        }, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

