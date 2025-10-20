import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
// import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        // element-plus 已通过 unplugin-vue-components 和 unplugin-auto-import 插件自动按需引入
        // 因此在 eslint 中声明为全局变量，避免未定义变量错误提示
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly'
      }
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  // skipFormatting,
  eslintPluginPrettierRecommended,

  {
    rules: {
      // 使用插件提供的规则（格式：`插件名/规则名`）
      'prettier/prettier': 'warn',
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
        }
      ],
      'vue/no-setup-props-destructure': ['off'] // 关闭 props 解构的校验
      // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
      // 'no-undef': 'error'
    }
  }
])
