https://github.com/facebook/react/blob/master/packages/react-dom/src/client/setTextContent.js

设置节点的textContent属性。对于文本更新，直接设置文本节点的`nodeValue `比使用`.textContent`要快，textContent将删除现有节点并创建新节点。