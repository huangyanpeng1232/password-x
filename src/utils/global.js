import {ElMessage} from 'element-plus'

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
export function isUrl(str) {
    return str && /^.*:\/\/.*$/.test(str)
}