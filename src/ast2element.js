function formatAst(ast) {
  switch (ast.type) {
    case 'bold':
      return {
        ...ast,
        tag: 'b'
      };
    case 'italic':
      return {
        ...ast,
        tag: 'i'
      };
    case 'codeSpan':
      return {
        ...ast,
        tag: 'code',
        block: [
          {
            type: 'text',
            text: ast.code
          }
        ],
        style: '`'
      };
    case 'text':
      return {
        ...ast,
        tag: 'txt'
      };
    default:
      return ast;
  }
}

function createStyleNode(style) {
  const span = document.createElement('span');
  span.classList.add('single');
  span.appendChild(document.createTextNode(style));
  return span;
}

export default function ast2element(ast) {
  const wrapper = document.createDocumentFragment();
  for (let i = 0; i < ast.length; i++) {
    const tmp = formatAst(ast[i]);
    if (tmp.tag === 'txt') {
      wrapper.appendChild(document.createTextNode(tmp.text));
      continue;
    }
    const node = document.createElement('span');
    node.classList.add('block');
    node.appendChild(createStyleNode(tmp.style));
    const child = document.createElement(tmp.tag);
    child.classList.add('block-child');
    if (tmp.block && tmp.block.length) {
      child.appendChild(ast2element(tmp.block));
    }
    node.appendChild(child);
    node.appendChild(createStyleNode(tmp.style));
    wrapper.appendChild(node);
  }
  return wrapper;
}
