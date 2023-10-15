import {ElMessage} from 'element-plus'

// 复制文本
export async function copyText(text) {
    let textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', 'readonly');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.setSelectionRange(0, textarea.value.length);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea)
    ElMessage.success('复制成功')
}

// 更新系统全部配置
export function updateConfig(config) {
    localStorage.setItem('systemConfig', JSON.stringify(config))
}

// 读取系统全部配置
export function loadConfig() {
    let systemConfigText = localStorage.getItem('systemConfig')
    if (!systemConfigText) {
        return null;
    }
    return JSON.parse(systemConfigText)
}

// 获取系统配置
export function getSystemConfig(key) {
    let systemConfigText = localStorage.getItem('systemConfig')
    if (!systemConfigText) {
        return null;
    }
    let systemConfig = JSON.parse(systemConfigText)
    return systemConfig[key]
}

// 设置系统配置
export function setSystemConfig(key, value) {
    let systemConfigText = localStorage.getItem('systemConfig')
    let systemConfig = {}
    if (systemConfigText) {
        systemConfig = JSON.parse(systemConfigText)
    }
    systemConfig[key] = value
    updateConfig(systemConfig)
}

// 判断字符串是否为url
export function isUrl(str) {
    return str && /^.*:\/\/.*$/.test(str)
}

// 随机密码
export function randomText(pool, length) {

    // 随机出来的密码
    let password = ''
    // 密码池下标
    let poolIndex = 0
    // 循环指定的密码位数
    for (let i = 0; i < length; i++) {
        // 在密码池中获取对应的字符类型
        let subPool = pool[poolIndex].split('');
        let randomIndex = Math.floor(Math.random() * subPool.length)
        password += subPool[randomIndex];
        poolIndex++;
        if (poolIndex >= pool.length) {
            poolIndex = 0;
        }
    }

    // 随机打乱顺序
    let arr = password.split('');
    let tmp;
    let j;
    for (let i = arr.length; i > 1; i--) {
        j = Math.floor(Math.random() * (i))
        tmp = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = tmp;
    }
    return arr.join('')
}