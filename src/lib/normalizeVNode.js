export function normalizeVNode(vNode) {
  if (typeof vNode === "number" || typeof vNode === "string") {
    return vNode.toString();
  }

  if (typeof vNode === "boolean" || vNode === null || vNode === undefined) {
    return "";
  }

  const { type, props = {}, children = [] } = vNode;
  if (typeof type === "function") {
    return normalizeVNode(
      type({ ...props, children: children.map(normalizeVNode) }),
    );
  }
  console.log(children.filter((child) => !child));
  return {
    type,
    props,
    children: children
      .filter(
        (child) =>
          (typeof child === "boolean") | (child === 0) || Boolean(child),
      )
      .map(normalizeVNode),
  };
}
