export function setCookieItem(key, value) {
    const rawCookies = document.cookie.split(/;s*/).filter(Boolean)
    const cookieItemIndex = rawCookies.findIndex(item => item.split('=')[0] === key)
    if (cookieItemIndex === -1) {
        rawCookies.push(`${key}=${value}`)
    } else {
        rawCookies[cookieItemIndex] = `${key}=${value}`
    }
    document.cookie = rawCookies.join('; ') + ';'
}

export function getCookieItem(key) {
    const rawCookies = document.cookie.split(/;s*/).filter(Boolean)
    const cookieItem = rawCookies.find(item => item.split('=')[0] === key)
    return cookieItem ? cookieItem.split('=')[1] : null
}

export function clearCookieItem(key) {
    const rawCookies = document.cookie.split(/;s*/).filter(Boolean)
    const filteredCookies = rawCookies.filter(item => item.split('=')[0] !== key)
    document.cookie = filteredCookies.join('; ') + ';'
}
