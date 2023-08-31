export function tag(el, padre){
    const tagObj = document.createElement(el);
    padre.appendChild(tagObj);

    return tagObj;
}