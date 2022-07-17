import { go, isIterable, isString, map } from './utils';

type HtmlElementType = HTMLElement | Document | Element;

type attributeType = {
  class?: string;
  placeholder?: string;
  alt?: string;
  src?: string;
};

type componentType = HTMLElement | string | (string | HTMLElement)[];

type RenderElementType = {
  tag: string;
  attributes?: attributeType;
  eventName?: string;
  handler?: (any) => void;
  childComponents?: componentType;
  selector?: string;
};

type SetEventType = Pick<RenderElementType, 'eventName' | 'handler' | 'selector'> & { element: HTMLElement };

export function qs(selector: string, scope: HtmlElementType = document) {
  if (!selector) throw 'no selector';

  return scope.querySelector(selector);
}

export function qsAll(selector: string, scope: HtmlElementType = document) {
  if (!selector) throw 'no selector';

  return Array.from(scope.querySelectorAll(selector));
}

export const on = ($target: HtmlElementType, eventName: string, handler) => {
  $target.addEventListener(eventName, handler);
};

export const delegate = ($target: HtmlElementType, eventName: string, selector: string, handler) => {
  const children = qsAll(selector, $target);
  const isTarget = (target) => children.includes(target) || target.closest(selector);
  const emitEvent = (event) => {
    if (!isTarget(event.target)) return false;
    handler(event);
  };

  on($target, eventName, emitEvent);
};

export const appendChildBeforeEnd = ($target: Element | HTMLElement, template: string | HTMLElement) => {
  try {
    typeof template === 'string' ? $target.insertAdjacentHTML('beforeend', template) : $target.appendChild(template);
  } catch (error) {
    console.log(error);
  }
};

export const appendChild = ($target: Element | HTMLElement, components) => {
  if (!isString(components) && isIterable(components)) {
    map((component) => appendChildBeforeEnd($target, component), components);
    return $target;
  }
  appendChildBeforeEnd($target, components);
  return $target;
};

export const addAttribute = ($node: HTMLElement, attributes: attributeType): void => {
  if (!attributes) {
    return;
  }

  for (const [attributeName, attributeValue] of Object.entries(attributes)) {
    $node.setAttribute(attributeName, attributeValue);
  }
  return;
};

export const createElement = (tag: string, attributes?: attributeType) => {
  const $node = document.createElement(tag);

  if (!attributes) {
    return $node;
  }

  addAttribute($node, attributes);

  return $node;
};

const setEvent = ({ element, eventName, handler, selector }: SetEventType) => {
  selector ? delegate(element, eventName, selector, handler) : on(element, eventName, handler);
  return element;
};

export const render = ({ tag, attributes, eventName, handler, childComponents, selector }: RenderElementType) => {
  return go(
    createElement(tag, attributes),
    (element) => setEvent({ element, eventName, handler, selector }),
    (element) => appendChild(element, childComponents || ''),
  );
};

export const toggleClassName = ($element: HTMLElement, className: string): boolean => {
  return $element.classList.toggle(className);
};

export const innerHTML = ($target: Element | HTMLElement, components) => {
  $target.innerHTML = '';
  appendChild($target, components);
  return $target;
};
