import './style.css';

function buildMenu(itemsArray, parentElement) {
    const menuID = document.querySelectorAll(".menu").length + 1;
    const menuDiv = createMenuDiv(menuID);
    
    menuDiv.appendChild(createMenuButton(menuID));

    itemsArray.forEach((item, itemIndex) => {
        const itemDiv = createItemDiv(item, menuID);
        menuDiv.appendChild(itemDiv);
    })

    parentElement.appendChild(menuDiv);

    return menuID;
}

function createMenuDiv(menuID) {
    const menuDiv = document.createElement("ul");
    menuDiv.id = menuID;
    menuDiv.classList = "menu";
    return menuDiv;
}

function createMenuButton(menuID) {
    const menuButton = document.createElement("li");
    menuButton.id = menuID;
    menuButton.classList = "menuButton";
    menuButton.textContent = "Menu";
    return menuButton;
}

function createItemDiv(itemText, menuID) {
    const itemDiv = document.createElement("li");
    itemDiv.id = menuID;
    itemDiv.classList = "menuItem hidden";
    itemDiv.textContent = itemText;
    return itemDiv;
}

function addOpenMenuEvent(menuID) {
    const menuButton = document.querySelector(`#\\3${menuID}.menuButton`);
    menuButton.addEventListener("click", (e) => {
        const menuID = menuButton.id;
        openMenu(menuID);
    })
}

function openMenu(menuID) {
    const menuItems = document.querySelectorAll(`#\\3${menuID}.menuItem`);
    menuItems.forEach((menuItem) => {
        menuItem.classList.toggle("hidden");
    })

    document.querySelector(`#\\3${menuID}.menuButton`).classList.toggle("straightenBtmEdge");
}


function displayMenu(parentElement) {
    const menuID = buildMenu(["About", "Blog", "Sign Up", "Contact"], parentElement);
    addOpenMenuEvent(menuID);
}

displayMenu(document.body);

