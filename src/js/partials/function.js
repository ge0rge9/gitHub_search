// Показать контент
function showContentBlock () {
    const outContent = document.querySelector(".main__out-content");
    outContent.classList.add("show-content");
}

//  Асинхронный запрос на github
async function getRepositories (repositories) {
    const api_call = await fetch(`https://api.github.com/search/repositories?q=${repositories}&page=1&per_page=100`);
    const data = await api_call.json();

    console.log(api_call);

    return {data}
}

// Показать контент, после выполнения getRepositories
function showData () {
    getRepositories(inputSearch.value).then((res) => {
        const resultSize = res.data.total_count;

        showContentBlock();
        showNavbar(resultSize);
        showRepositories(res.data.items);

        console.log(res.data);
    })
}

// Показть навбар
function showNavbar (size) {
    showResultSize(size);
    showPageSize(size);
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

function showRepositories (items) {
    const parent = document.querySelector("#table tbody");

    parent.innerHTML = "";

    items.map((item, index) => {
        const child = document.createElement('tr');
        const tdActions = document.createElement('td');
        const owner = new Element('th', item.owner.login, ["owner"]);
        const repositories = new Element('th', item.full_name, ["repositories"]);
        const update = new Element('th', item.updated_at, ["update"]);
        const language = new Element('th', item.language, ["language"]);
        const openBtn = new ElementBtn('input', ["btn", "btn-success", "btn-sm", "open"], {type: "button", value: "Open"});
        const infoBtn = new ElementBtn('input', ["btn", "btn-info", "btn-sm", "info"], {type: "button", value: "Info"});
        const removeBtn = new ElementBtn('input', ["btn", "btn-danger", "btn-sm", "remove"], {type: "button", value: "Remove"});

        child.setAttribute("data-index", index);

        owner.render(child);
        repositories.render(child);
        update.render(child);
        language.render(child);
        openBtn.render(tdActions);
        infoBtn.render(tdActions);
        removeBtn.render(tdActions);

        removeBtn.event('click', (e) => { clickRemoveBtn(e, items) });

        child.appendChild(tdActions);
        parent.appendChild(child);
    })


}

//
function clickRemoveBtn (e, arrItems) {
    const index = e.target.parentNode.parentNode.getAttribute("data-index");

    arrItems.splice(index, 1);
    showRepositories(arrItems);
}