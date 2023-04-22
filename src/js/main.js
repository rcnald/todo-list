"use strict"

const addItemContainer = document.getElementsByClassName('js-add')[0]
const addItem = document.getElementsByClassName('js-add-item')[0]
const ItemList = document.getElementsByClassName('js-list')[0]
const ItemContainer = document.getElementsByClassName('js-event-listener')[0]
const items = document.getElementsByClassName('js-item')
const itemInput = document.getElementsByClassName('js-item-input')[0]
const pendencies = document.getElementsByClassName('js-pendencies')[0]
const clearTasks = document.getElementsByClassName('js-clear-tasks')[0]

function Task(name, completed) {
    this.name = name,
    this.completed = completed || false
    this.done = function() {
        this.completed = !this.completed
    }
}

let tasks = []

function generateErrorMessage(errorType, errorMessages){
    const errorStyle = {
        red : {
            background : "o-message--red",
            icon : "bxs-error-circle",
            iconColor : "o-message__icon--red",
        },
        yellow : {
            background : "o-message--yellow",
            icon : "bxs-error",
            iconColor : "o-message__icon--yellow",
        },
        green : {
            background : "o-message--green",
            icon : "bxs-check-circle",
            iconColor : "o-message__icon--green",
        },
    }

    const exists = document.querySelector(`.${errorStyle[errorType].background}`)

    if(exists && exists.textContent === errorMessages) return 

    const error = document.createElement('div')
    error.className = `o-message ${errorStyle[errorType].background} l-message l-message__wrapper has-shown`

    const errorWrapper = document.createElement('div')
    errorWrapper.className = "o-message__wrapper l-message__wrapper"

    const errorIcon = document.createElement('i')
    errorIcon.className = `o-message__icon ${errorStyle[errorType].iconColor} bx ${errorStyle[errorType].icon}`

    const errorMessage = document.createElement('p')
    errorMessage.className = "o-message__message"
    errorMessage.textContent = errorMessages

    const errorLoading = document.createElement('div')
    errorLoading.className = "o-message__loading l-message__loading"

    errorWrapper.appendChild(errorIcon)
    errorWrapper.appendChild(errorMessage)

    error.appendChild(errorWrapper)
    error.appendChild(errorLoading)

    return error
}

function callError(color, msg){
    const body = document.getElementsByClassName('js-body')[0]
    const error = generateErrorMessage(color, msg) 
    
    if(!error) return

    function removeErrorMessage(){
        error.remove()
    }

    body.prepend(error)
    setTimeout(removeErrorMessage, 2000)
}

function generateTask(task) {
    const item = document.createElement('li')
    item.className = "c-card__item l-card__item js-item"

    const checkBox = document.createElement('input')
    checkBox.className = `c-card__check l-card__check bx ${task.completed ? "bxs-checkbox-checked" : "bx-checkbox"} js-check-item`
    checkBox.setAttribute("type", "checkbox")
    checkBox.setAttribute("data-action", "check")
    checkBox.checked = task.completed

    const name = document.createElement('span')
    name.className = "c-card__name l-card__name"
    name.textContent = task.name
    name.setAttribute("title", `${task.name}`)

    const editButton = document.createElement('button')
    editButton.className = "c-card__button c-card__button--edit js-edit-item"
    editButton.setAttribute("title", "Editar")
    editButton.setAttribute("data-action", "edit")
    editButton.setAttribute("value", "aa")

    const editButtonIcon = document.createElement('i')
    editButtonIcon.className = "bx bxs-edit"

    const editButtonSr = document.createElement('span')
    editButtonSr.className = "sr-only"
    editButtonSr.textContent = "Editar"
    editButtonSr.setAttribute("data-action", "edit")

    const deleteButton = document.createElement('button')
    deleteButton.className = "c-card__button c-card__button--delete js-delete-item"
    deleteButton.setAttribute("title", "Excluir")
    deleteButton.setAttribute("data-action", "delete")

    const deleteButtonIcon = document.createElement('i')
    deleteButtonIcon.className = "bx bxs-trash"

    const deleteButtonSr = document.createElement('span')
    deleteButtonSr.className = "sr-only"
    deleteButtonSr.textContent = "Excluir"
    deleteButtonSr.setAttribute("data-action", "delete")

    const editContainer = document.createElement('dialog')
    editContainer.className = "c-card__modal l-card__modal js-edit"

    const editWrapperInput = document.createElement('div')
    editWrapperInput.className = "c-card__wrapper c-card__wrapper--modal"

    const editWrapperButton = document.createElement('div')
    editWrapperButton.className = "l-wrapper c-card__wrapper"

    const editLabel = document.createElement('label')
    editLabel.className = "c-card__name"
    editLabel.textContent = "Novo nome"

    const editInput = document.createElement('input')
    editInput.className = "c-card__input c-card__input--modal js-edit-input"
    editInput.setAttribute("type", "text")
    editInput.setAttribute("data-action", "editInput")
    editInput.setAttribute("placeholder", "Nome da tarefa")

    editInput.addEventListener('keypress', e => {
        if(e.key === 'Enter'){
            editSave.click()
        }
    })

    const editCancel = document.createElement('button')
    editCancel.className = "o-button o-button--cancel l-button js-edit-cancel"
    editCancel.setAttribute("data-action", "cancel")
    editCancel.textContent = "Cancelar"

    const editSave = document.createElement('button')
    editSave.className = "o-button l-button js-edit-save"
    editSave.setAttribute("data-action", "save")
    editSave.setAttribute("disabled", "")
    editSave.textContent = "Salvar e Aplicar"
    
    item.appendChild(checkBox)
    item.appendChild(name)

    editButton.appendChild(editButtonIcon)
    editButton.appendChild(editButtonSr)

    item.appendChild(editButton)

    deleteButton.appendChild(deleteButtonIcon)
    deleteButton.appendChild(deleteButtonSr)

    item.appendChild(deleteButton)

    editWrapperInput.appendChild(editLabel)
    editWrapperInput.appendChild(editInput)
    
    editWrapperButton.appendChild(editCancel)
    editWrapperButton.appendChild(editSave)

    editContainer.appendChild(editWrapperInput)
    editContainer.appendChild(editWrapperButton)

    item.appendChild(editContainer)

    return item
}

function renderTasks(){
    ItemList.innerHTML = ""
    
    tasks.forEach(task => {
        ItemList.appendChild(generateTask(task))
    })

    const tasksNumbersCompleted = tasks.filter( (e, i) => {
        return tasks[i].completed === false
    })

    const tasksNumbers = tasksNumbersCompleted.length

    if(!tasksNumbers){
        pendencies.textContent = "Você não tem tarefas pendentes"
    }else{
        pendencies.textContent = `Você tem ${tasksNumbers} ${tasksNumbers === 1 ? "tarefa" : "tarefas"} ${tasksNumbers === 1 ? "pendente" : "pendentes"}`
    }

    itemInput.focus()
}

function addTask(taskName){
    tasks.unshift(new Task(taskName))
    renderTasks()
}

function buttonAnimation (){
    const addItemName = document.getElementsByClassName('js-button-name')[0]
    const addItemIcon = document.getElementsByClassName('js-button-icon')[0]

    const toggleClass = function(){
        for(let i = 1; i <= arguments.length; i++){
            arguments[0].classList.toggle(arguments[i]);
        }
    }

    animationButton = () => {
        toggleClass(addItemIcon, 'bx-list-check','u-icon-animation','bx-list-plus')
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
}

addItemContainer.addEventListener('submit', function(e){
    if(itemInput.value){
        addTask(itemInput.value)
        itemInput.value = ""
        buttonAnimation()
        callError('green', 'Tarefa adicionada com sucesso!')
        renderTasks()
    }else{
        addItem.blur()
        itemInput.classList.add('is-shaking')
        itemInput.classList.add('c-card__input--invalid')

        setTimeout(() => {
            itemInput.classList.remove('is-shaking')
            itemInput.classList.remove('c-card__input--invalid')
        }, 500)
        callError('red', 'Você não pode adicionar uma tarefa vazia!')
    }
    itemInput.focus()
    e.preventDefault()
})

ItemContainer.addEventListener('click', e => {
    const action = e.target.getAttribute("data-action")

    if(!action) return

    let currentItem = e.target

    while(currentItem.nodeName !== "LI"){
        currentItem = currentItem.parentElement
    }

    let currentItemIndex = [...items].indexOf(currentItem)
    const currentEditModal = currentItem.getElementsByClassName('js-edit')[0]
    const currentEditInput = currentItem.getElementsByClassName('js-edit-input')[0]
    
    const actions = {
        edit : function () {
            currentEditInput.value = tasks[currentItemIndex].name
            currentEditModal.showModal()
        },
        cancel : function () {
            currentEditModal.close()
        },
        save : function () {
            tasks[currentItemIndex].name = currentEditInput.value
            callError('green', 'Tarefa editada com sucesso!')
        },
        delete : function () {
            tasks.splice(currentItemIndex, 1)
            callError('green', 'Tarefa excluida com sucesso!')
        },
        check : function () {
            tasks[currentItemIndex].done()
        },
    }

    if(actions[action]){
        actions[action]()

        if(!(actions[action] == actions.edit)) renderTasks()
    }
})

ItemContainer.addEventListener('keyup', e => {
    const action = e.target.getAttribute("data-action")

    if(!action) return

    let currentItem = e.target

    while(currentItem.nodeName !== "LI"){
        currentItem = currentItem.parentElement
    }

    let currentItemIndex = [...items].indexOf(currentItem)
    
    const actions = {
        editInput : function () {
            const currentEditInput = currentItem.getElementsByClassName('js-edit-input')[0]
            const currentEditSave = currentItem.getElementsByClassName('js-edit-save')[0]

            if(!currentEditInput.value || tasks[currentItemIndex].name === currentEditInput.value){
                currentEditSave.setAttribute("disabled", "")
            }else{
                currentEditSave.removeAttribute("disabled")
            }
        },
    }

    if(actions[action]){
        actions[action]()
    }
})

clearTasks.addEventListener('click', () => {
    if(!items.length){
        callError('yellow', 'Não existem tarefas para serem limpas!')
        return
    }
    tasks = []
    callError('green', 'Tarefas limpas com sucesso!')
    renderTasks()
})

renderTasks()