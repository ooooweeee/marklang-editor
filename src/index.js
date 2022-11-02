import markdown2ast from './markdown2ast';

const markdownString = `**Markdown 编辑器** - 要用优雅的姿势编辑 \`Markdown\``;

/*
[
  {
    "single": "**",
    "tag": "b",
    "value": "Markdown 编辑器"
  },
  {
    "tag": "txt",
    "value": " - 要用优雅的姿势编辑 "
  },
  {
    "single": "`",
    "tag": "span",
    "value": "Markdown"
  }
]
*/
const ast = markdown2ast(markdownString);
console.log(ast);
