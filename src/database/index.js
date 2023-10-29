import store from "@/store/index.js";
import * as cos from "@/database/cos.js";
import * as oss from "@/database/oss.js";

const databases = {
    cos: cos,
    oss: oss,
}

// 配置数据库信息并登录
export async function login(form) {
    return new Promise((resolve, reject) => {
        databases[form.type].login(form).then(res => {
            store.commit('setDatabase', res)
            store.commit('setDatabaseForm', form)
            resolve(res)
        }).catch(e => {
            reject(e)
        });
    })
}

// 上传文件
export function putFile(key, json) {
    let databaseType = store.state.databaseForm.type
    return databases[databaseType].putFile(key, json)
}

// 获取文件
export function getFile(key) {
    let databaseType = store.state.databaseForm.type
    return databases[databaseType].getFile(key)
}

// 删除文件
export function delFile(key) {
    let databaseType = store.state.databaseForm.type
    return databases[databaseType].delFile(key)
}

