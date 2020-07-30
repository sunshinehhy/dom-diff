const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let Index=0

function diffChildren(oldChildren, newChildren, index, patches) {
    oldChildren.forEach((child, idx) => {
        walk(child, newChildren[idx], ++Index, patches)
    })
}

function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]'
}

function diff(oldTree, newTree) {
    let patches = {}
    let index = 0
    walk(oldTree, newTree, index, patches)
    return patches
}

function walk(oldNode, newNode, index, patches) {
    let currentPatch = [];
    if(!newNode){
        currentPatch.push({type: REMOVE, index})
    } else if (isString(oldNode) && isString(newNode)) {
        if(oldNode!==newNode){
            currentPatch.push({type: TEXT, text:newNode})
        }
    } else if (oldNode.type === newNode.type) {
        let attrs = diffAttrs(oldNode.props, newNode.props)
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs})
        }
        diffChildren(oldNode.children, newNode.children,index, patches)
    }else {
        currentPatch.push({type: REPLACE, newNode})
    }
    // console.log(currentPatch,index);
    if (currentPatch.length > 0) {
        patches[index] = currentPatch
    }

}

function diffAttrs(oldProps, newProps) {
    let patches = {}
    for (const oldPropsKey in oldProps) {
        if (oldProps.hasOwnProperty(oldPropsKey)) {
            if (oldProps[oldPropsKey] !== newProps[oldPropsKey]) {
                patches[oldPropsKey] = newProps[oldPropsKey]
            }
        }
    }
    for (const newPropsKey in newProps) {
        if (newProps.hasOwnProperty(newPropsKey)) {
            if (!oldProps.hasOwnProperty(newPropsKey)) {
                patches[newPropsKey] = newProps[newPropsKey]
            }
        }
    }
    return patches
}

export default diff