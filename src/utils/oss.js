import OSS from 'ali-oss'
import store from "@/store/index.js";

let prefix = 'password-x/'

// 设置oss信息并验证是否正确
export async function login(form) {
    return new Promise((resolve, reject) => {
        const client = new OSS(form)

        // 获取文件列表验证权限是否正确
        client.list({'max-keys': 1}).then(() => {
            resolve(client)
        }).catch((err) => {
            reject(err);
        });
    })
}

// 上传文件
export function putFile(ossKey, json) {
    let headers = {
        // 指定Object的存储类型。
        'x-oss-storage-class': 'Standard', // 指定Object的访问权限。
        'x-oss-object-acl': 'private', // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
        'x-oss-forbid-overwrite': 'true',
    };
    return new Promise((resolve, reject) => {
        let buffer = new OSS.Buffer(JSON.stringify(json));
        store.state.oss.put(prefix + ossKey, buffer, headers).then(res => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        });
    })
}

// 获取文件
export function getFile(ossKey) {
    return new Promise((resolve, reject) => {
        store.state.oss.get(prefix + ossKey).then(res => {
            resolve(JSON.parse(res.content))
        }).catch((err) => {
            if (err.status === 404) {
                resolve({})
            } else {
                reject(err);
            }
        });
    })
}

// 删除文件
export function delFile(ossKey) {
    return store.state.oss.delete(prefix + ossKey)
}

