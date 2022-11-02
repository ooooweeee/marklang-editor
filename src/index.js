import markdown2ast from './markdown2ast';

const markdownString = `**Markdown 编辑器** - 要用优雅的姿势编辑 \`Markdown\``;

const ast = markdown2ast(markdownString);
console.log(ast);
