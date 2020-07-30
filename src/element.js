class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

function createElement(type, props, children) {
  return new Element(type, props, children);
}

function setAttr(node, key, value) {
  switch (key) {
    case 'value':
      if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

function render(vDom) {
  let {type, props, children} = vDom;
  let ele = document.createElement(type);
  for (let k in props) {
    setAttr(ele, k, props[k]);
  }
  children.forEach(child => {
    if (child instanceof Element) {
      child = render(child);
    } else {
      child = document.createTextNode(child);
    }
    ele.appendChild(child);
  });
  return ele;
}

function renderDom(dom, container) {
  container.appendChild(dom);
}

export {
  createElement,
  render,
  renderDom,
  Element
};
