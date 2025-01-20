module.exports = {
    '*.{json, js, ts, jsx, tsx, html, css, scss, sass}': [
        'prettier --write',
    ],
    '*.{js, ts, jsx, tsx}': ['eslint --fix'],
    '*.test.{js, ts, jsx, tsx}': ['npm run test'],
};