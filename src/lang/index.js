import en from './en';
import zh from './zh';
import { getLocale, saveLocale } from '@/utils/localstorage'
import Vue from 'vue';
import VueI18N from 'vue-i18n';

Vue.use(VueI18N)

const messages = {
  en,
  zh
}

let locale;
locale = getLocale()
if (!locale) {
  // 如果locale不存在，则设置为浏览器默认语言
  let browserLang = navigator.language;
  if (/zh/.test(browserLang)) {
    locale = 'zh'
  } else if (/en/.test(browserLang)) {
    locale = 'en'
  }
  saveLocale(locale)
}



const i18n = new VueI18N({
  locale,
  messages
})


// 通过 `i18n` 选项创建 Vue 实例
// new Vue({ i18n }).$mount('#app')
export default i18n