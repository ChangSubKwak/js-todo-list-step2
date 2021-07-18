const $  = (selector, tag = document) => tag.querySelector(selector);
const $$ = (selector, tag = document) => tag.querySelectorAll(selector);

export { $, $$ };