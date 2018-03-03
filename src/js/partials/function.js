// Показать контент
function showContentBlock () {
    const outContent = document.querySelector(".main__out-content");
    outContent.classList.add("show-content");
}

//  Асинхронный запрос на github
async function getRepositories (repositories, page = 1) {
    const api_call = await fetch(`https://api.github.com/search/repositories?q=${repositories}&page=${page}&per_page=100`);
    const data = await api_call.json();

    console.log(api_call);

    return {data}
}

// Показать контент, после выполнения getRepositories
function showData (currPage = 1, perPage = 100) {
    getRepositories(inputSearch.value, currPage).then((res) => {
        const totalSize = res.data.total_count;
        const totalPages = totalSize / perPage;
        const next = new Element("button", "&#8594;", ["btn", "btn-sm"]);
        const prev = new Element("button", "&#8592;", ["btn", "btn-sm"]);
        const size = document.querySelector("#page-size");
        const parentPage = document.querySelector(".page_btn");

        parentPage.innerHTML = "";

        prev.event("click", () => showData(currPage - 1));
        next.event("click", () => showData(currPage + 1));

        if(totalPages > 1){

            if(currPage < totalPages){
                prev.render(parentPage);
                next.render(parentPage);
                prev.disabld_true();

                currPage > 1 ? prev.disabld_false() : null;

            } else {
                prev.render(parentPage);
                next.render(parentPage);
                next.disabld_true();
            }

        }

        showContentBlock();
        showNavbar(totalSize);
        showRepositories(res.data.items);
        size.innerHTML += `/${currPage}`;

        console.log(res.data);
    })
}

// Показть навбар
function showNavbar (size) {

    if(size > 0) {
        showResultSize(size);
        showPageSize(size);
    } else {
        showEmpty();
    }

}

        // Показать количество результатов
function showResultSize (size) {
    const block = document.querySelector("#res-size");

    size > 0 ? block.innerHTML = `Results:\t${ size }` : block.innerHTML = `Result\t${ size }`;
}

        // Показатьколичество страниц
function showPageSize (size) {
    const block = document.querySelector("#page-size");

    size > 100 ? block.innerHTML = `Pages:\t${ Math.ceil(size / 100) }` : block.innerHTML = `Page:\t${ Math.ceil(size / 100) }`;
}

        //
function showEmpty () {
    const parent = document.querySelector(".empty");
    const block = document.querySelector(".main__out-content");
    const resultEmpty = new Element("p", "Not found repositories");

    parent.innerHTML = "";
    block.classList.remove("show-content");
    block.classList.add("hide-content");

    resultEmpty.render(parent);
}

//
function showRepositories (items) {
    const parent = document.querySelector("#table tbody");

    parent.innerHTML = "";

    items.map((item, index) => {
        const child = document.createElement("tr");
        const tdActions = document.createElement("td");
        const owner = new Element("th", item.owner.login, ["owner"]);
        const repositories = new Element("th", item.full_name, ["repositories"]);
        const update = new Element("th", item.updated_at, ["update"]);
        const language = new Element("th", item.language, ["language"]);
        const openBtn = new ElementBtn("input", ["btn", "btn-success", "btn-sm", "open"], {type: "button", value: "Open"});
        const removeBtn = new ElementBtn("input", ["btn", "btn-danger", "btn-sm", "remove"], {type: "button", value: "Remove"});

        child.setAttribute("data-index", index);

        owner.render(child);
        repositories.render(child);
        update.render(child);
        language.render(child);
        openBtn.render(tdActions);
        removeBtn.render(tdActions);

        removeBtn.event("click", (e) => { click_removeBtn(e, items) });
        openBtn.event("click", () => { click_openBtn(item.html_url) });

        child.appendChild(tdActions);
        parent.appendChild(child);
        document.querySelector(".empty").innerHTML = "";
    });

    console.log(items);

}

//
function click_removeBtn (e, arrItems) {
    const index = e.target.parentNode.parentNode.getAttribute("data-index");

    arrItems.splice(index, 1);
    showRepositories(arrItems);
}

//
function click_openBtn (url) {
    window.open(url);
}