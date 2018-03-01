class Element {
    constructor (tagName, content, classArr, attObj) {

        this.childElem = document.createElement(tagName);
        this.childElem.innerHTML = content;

        if (classArr) {
            classArr.map(item => {
                this.childElem.classList.add(item);
            });
        }

        if(attObj){

            for (let key in attObj) {
                this.childElem.setAttribute(key, attObj[key]);
            }

        }

    }

    render (parent) {
        parent.appendChild(this.childElem);
    }

}