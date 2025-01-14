import { normalizeLocale, LOCALE_EN } from '../helpers/i18n/index'

export function getLocale () {
  // 优先使用 $locale
  const app = getApp({
    allowDefault: true
  })
  if (app && app.$vm) {
    return app.$vm.$locale
  }
  return normalizeLocale(__GLOBAL__.getSystemInfoSync().language) || LOCALE_EN
}

export function setLocale (locale) {
  const app = getApp()
  if (!app) {
    return false
  }
  const oldLocale = app.$vm.$locale
  if (oldLocale !== locale) {
    app.$vm.$locale = locale
    onLocaleChangeCallbacks.forEach((fn) => fn({
      locale
    }))
    return true
  }
  return false
}

const onLocaleChangeCallbacks = []
export function onLocaleChange (fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn)
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale
}
