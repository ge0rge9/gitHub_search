class ElementBtn {
    constructor (tagName, classArr, attObj) {

        this.childElem = document.createElement(tagName);

        classArr.map(item => {
            this.childElem.classList.add(item)
        });


        for (let key in attObj) {
            this.childElem.setAttribute(key, attObj[key]);
        }

    }

    render (parent) {
        parent.appendChild(this.childElem);
    }

    event (type, callback){
        this.childElem.addEventListener(type, callback);
    }
}