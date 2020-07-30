import {Element, render} from './element'

let allPatches;
let index = 0;

function patch(node, patches) {
    console.log(node, patches);
    allPatches = patches;
    walk(node)
}

function setAttr(node, key, value) {
    switch (key) {
        case 'value':
            if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                node.value = value
            } else {
                node.setAttribute(key, value)
            }
            break
        case 'style':
            node.style.cssText = value
            break
        default:
            node.setAttribute(key, value)
            break
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        console.log(patch, patches, node);
        switch (patch.type) {
            case 'ATTRS':
                let attrs = patch.attrs
                for (const allPatchesKey in attrs) {
                    if (attrs.hasOwnProperty(allPatchesKey)) {
                        let value = attrs[allPatchesKey];
                        if (value) {
                            setAttr(node,allPatchesKey,value)
                        } else {
                            node.removeAttribute(allPatchesKey)
                        }
                    }
                }
                break
            case 'TEXT':
                node.textContent = patch.text
                break
            case 'REPLACE':
                let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode);
                node.parentNode.replaceChild(newNode, node)
                break
            case 'REMOVE':
                node.parentNode.removeChild(node)
                break
            default:

                break
        }
    })

}

function walk(node) {
    // console.log(allPatches);
    let currentPatch = allPatches[index++]
    let childNodes = node.childNodes;
    childNodes.forEach(child => walk(child))
    console.log(node, currentPatch);
    if (currentPatch) {
        doPatch(node, currentPatch)
    }
}

export default patch
