export default function injectCss(css) {
  const style = document.createElement('style');
  style.textContent = css;

  document.head.append(style);
}
