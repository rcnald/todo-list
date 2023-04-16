const addItemContainer = document.getElementsByClassName('js-add')[0]
const addItem = document.getElementsByClassName('js-add-item')[0]
const item = document.getElementsByClassName('js-item')[0]
const editItemContainer = document.getElementsByClassName('js-edit')[0]
const editCancelButton = document.getElementsByClassName('js-edit-cancel')[0]
const editSaveButton = document.getElementsByClassName('js-edit-save')[0]

addItemContainer.addEventListener('submit', function(e){
    e.preventDefault()
})

addItem.addEventListener('click', function(){
    const addItemName = document.getElementsByClassName('js-button-name')[0]
    const addItemIcon = document.getElementsByClassName('js-button-icon')[0]

    const toggleClass = function(){
        for(let i = 1; i <= arguments.length; i++){
            arguments[0].classList.toggle(arguments[i]);
        }
    }

    animationButton = () => {
        toggleClass(addItemIcon, 'bx-list-check','icon-animation','bx-list-plus')
        toggleClass(addItemName, 'has-disappear')
    }

    animationNameStart = () => {
        addItemName.textContent = "Adicionado"
    }
    animationNameEnd = () => {
        addItemName.textContent = "Adicionar"
        addItem.blur()
    }
    
    setTimeout(animationButton, 0)
    setTimeout(animationNameStart, 0)
    setTimeout(animationNameEnd, 2000)
    setTimeout(animationButton, 3300)
})

editItemContainer.showModal();

item.addEventListener('click', e => {
    const action = e.target.getAttribute("data-action")

    if(!action) return

    let currentItem = e.target

    while(currentItem.nodeName !== "LI"){
        currentItem = currentItem.parentElement
    }
    
    const actions = {
        cancel : function () {
            const currentEditModal = currentItem.getElementsByClassName('js-edit')[0]

            currentEditModal.close()
        }
    }

    if(actions[action]){
        actions[action]()
    }
})