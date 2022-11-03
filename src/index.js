import markdownAst from 'markdown-ast';
import markdown2ast from './markdown2ast';

import ast2element from './ast2element';

const markdownString = `**Markdown 编辑器** - 要用*优雅*的姿势编辑\`Markdown\``;

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

/*
[
  {
    "type": "bold",
    "block": [
      {
        "type": "text",
        "text": "Markdown 编辑器"
      }
    ],
    "style": "**"
  },
  {
    "type": "text",
    "text": " - 要用"
  },
  {
    "type": "italic",
    "block": [
      {
        "type": "text",
        "text": "优雅"
      }
    ],
    "style": "*"
  },
  {
    "type": "text",
    "text": "的姿势编辑"
  },
  {
    "type": "codeSpan",
    "code": "Markdown"
  }
]
*/

const container = document.querySelector('#container');
container.setAttribute('contenteditable', true);

container.appendChild(ast2element(markdownAst(markdownString)));

function handler() {
  const { focusNode } = getSelection();

  console.log(
    focusNode.parentNode.classList.contains('block-child'),
    getSelection()
  );
}

container.addEventListener('mouseup', handler);
container.addEventListener('keyup', handler);
