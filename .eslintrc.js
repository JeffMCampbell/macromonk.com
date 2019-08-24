module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/html-indent': ['error', 2, {}],
        indent: ['error', 4, {}],
        semi: 2,
            'no-shadow': 'off',
            'no-param-reassign': ['error', { props: false }],
            'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0, maxBOF: 0 }],
            'prefer-destructuring': 'off',
            'no-prototype-builtins': 'off',
            'line-break-style': 'off',
            'max-len': ['error', {
                code: 3000
            }],
        'vue/max-attributes-per-line': ['error', {
            singleline: 10,
            multiline: {
                max: 1,
                allowFirstLine: false
            }
        }],
        'vue/name-property-casing': ['error', 'kebab-case'],
        'no-plusplus': ['error', {
            allowForLoopAfterthoughts: true
        }],
        'vue/require-v-for-key': 'warn',
        'import/no-extraneous-dependencies': 'off',
        camelcase: 'off',
            'operator-assignment': 'off',
            'class-methods-use-this': ['warn', {
                exceptMethods: ['handleError', 'transformData']
            }],
        'vue/require-prop-types': 'off',
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'data',
                    'computed',
                    'watch',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    ['template', 'render'],
                    'renderError'
                ]
            }
        ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
}
