import { createElement } from '../../dom';
import fixYellowBlocksCss from '../../assets/css/fixYellowBlocks.css?inline';

export function fixYellowBlocks() {
  createStyleElement({
    content: fixYellowBlocksCss,
    parent: document.head,
  });
}

function createStyleElement({ content, parent }: { content: string; parent: Element }) {
  return createElement({
    tag: 'style',
    properties: {
      textContent: content,
    },
    parent,
    insertMethod: 'append',
  });
}
