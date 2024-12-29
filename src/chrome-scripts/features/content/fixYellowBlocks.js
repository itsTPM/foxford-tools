import { Element } from '../../classes';
import fixYellowBlocksCss from '../../assets/fixYellowBlocks.css?inline';

export default function fixYellowBlocks() {
  createStyleElement({
    content: fixYellowBlocksCss,
    parent: document.head,
  });
}

function createStyleElement({ content, parent }) {
  const styleElement = new Element({
    tag: 'style',
    properties: {
      textContent: content,
    },
    parent,
    insertMethod: 'append',
  });

  return styleElement;
}
