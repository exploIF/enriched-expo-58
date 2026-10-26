export const SAMPLES: { label: string; html: string }[] = [
  {
    label: 'Formatting',
    html:
      '<html><h1>Rich text, natively</h1>' +
      '<p>Mix <b>bold</b>, <i>italic</i>, <u>underline</u>, <s>strikethrough</s> and <code>inline code</code>.</p>' +
      '<blockquote><p>Blockquotes keep their own styling.</p></blockquote>' +
      '<p>Visit <a href="https://swmansion.com">Software Mansion</a> for more.</p></html>',
  },
  {
    label: 'Lists',
    html:
      '<html><h2>Shopping list</h2>' +
      '<ul><li>Apples</li><li>Bread</li><li>Coffee</li></ul>' +
      '<h3>Steps</h3>' +
      '<ol><li>Open the app</li><li>Write something</li><li>Ship it</li></ol>' +
      '<ul data-type="checkbox"><li checked>Install library</li><li>Build showcase</li></ul></html>',
  },
  {
    label: 'Code & mentions',
    html:
      '<html><p>Hey <mention text="@igor" indicator="@" id="1">@igor</mention>, check this out:</p>' +
      '<codeblock><p>const editor = useRef(null);</p></codeblock>' +
      '<p>Tagged with <mention text="#expo" indicator="#" id="2">#expo</mention>.</p></html>',
  },
];
