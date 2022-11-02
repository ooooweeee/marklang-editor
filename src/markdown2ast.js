function getSingleTag(single) {
  switch (single) {
    case '**':
      return 'b';
    case '`':
      return 'span';
    default:
      return;
  }
}

export default function markdown2ast(markdown) {
  let result = [];
  let index = 0;
  let queue = [];
  let txtNodeOffset = 0;

  while (index < markdown.length) {
    const tmp = markdown.substring(index);
    const state = tmp.match(/^(\*\*|\`)/);
    if (!state) {
      index++;
      continue;
    } else {
      !queue.length &&
        txtNodeOffset !== index &&
        result.push({
          tag: 'txt',
          value: markdown.substring(txtNodeOffset, index)
        });
    }

    const latest = queue.pop() || {};
    const [single] = state;
    index += single.length;
    if (single !== latest.single) {
      latest.single && queue.push(latest);
      queue.push({
        single: single,
        tag: getSingleTag(single),
        value: index
      });
    } else {
      latest.value = markdown.substring(latest.value, index - single.length);
      txtNodeOffset = index;
      result.push(latest);
    }
  }
  return result;
}
