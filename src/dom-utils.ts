export function updateDomProperties(dom: HTMLElement, prevProps, nextProps) {
  const isEvent = (name: string) => name.startsWith("on");
  const isAttribute = (name: string) => !isEvent(name) && name !== "children";

  // Remove event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach((name) => {
      const eventType = name.toLocaleLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
}
