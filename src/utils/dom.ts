import { go, isIterable, isString, map } from './utils';

type HtmlElementType = HTMLElement | Document;

type attributeType = {
  class?: string;
  placeholder?: string;
};

type componentType = HTMLElement | string | (string | HTMLElement)[];

type RenderElementType = {
  tag: string;
  attributes?: attributeType;
  eventName?: string;
  handler?: () => void;
  childComponents?: componentType;
};

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
  const emitEvent = (event) => {
    const potentialElements = qsAll(selector, $target);

    for (const potentialElement of potentialElements) {
      if (potentialElement === event.$target) {
        return handler.call(event.$target, event);
      }
    }
  };

  on($target, eventName, emitEvent);
};

export const emit = ($target: HtmlElementType, eventName: string, detail) => {
  const event = new CustomEvent(eventName, { detail });
  $target.dispatchEvent(event);
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

export const render = ({ tag, attributes, eventName, handler, childComponents }: RenderElementType) => {
  return go(
    createElement(tag, attributes),
    (element) => {
      on(element, eventName, handler);
      return element;
    },
    (element) => appendChild(element, childComponents),
  );
};
