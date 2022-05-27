export const TEXT_ELEMENT = "TEXT ELEMENT";

export function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter((c) => c !== null && c !== false)
    .map((c) => (c instanceof Obejct ? c : createElement(c)));
  return { type, props };
}
