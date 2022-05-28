import { updateDomProperties } from "./dom-utils";
import { TEXT_ELEMENT } from "./element";
import { createPublicInstance } from "./component";

let rootInstance = null;

export function reconcile(parentDom, instance, element) {
  if (!instance) {
    // Create instance
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  }
}

function instantiate(element) {
  const { type, props } = element;
  const isDomElement = typeof type === "string";

  if (isDomElement) {
    // Instantiate DOM Element
    const isTextElement = type === TEXT_ELEMENT;
    const dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(type);

    updateDomProperties(dom, [], props);

    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map((item) => item.dom);
    childDoms.forEach((item) => dom.appendChild(item));

    const instance = { dom, element, childInstances };
    return instance;
  } else {
    const instance = {};
    const publicInstance = createPublicInstance(element, instance);
    const childElement = publicInstance.render();
    const childInstance = instantiate(childElement);
    const dom = childInstance?.dom;

    Object.assign(instance, { dom, element, childInstance, publicInstance });

    return instance;
  }
}
