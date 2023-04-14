const addItem = document.getElementsByClassName('js-add')[0]
const addButton = document.getElementsByClassName('js-add-button')[0]

addItem.addEventListener('submit', function(e){
    e.preventDefault()
})

addButton.addEventListener('click', function(){
    const addButtonName = document.getElementsByClassName('js-button-name')[0]
    const addButtonIcon = document.getElementsByClassName('js-button-icon')[0]

    animationButton = () => {
        addButtonIcon.classList.toggle('bx-list-check')
        addButtonIcon.classList.toggle('icon-animation')
        addButtonName.classList.toggle('has-disappear')
        addButtonIcon.classList.toggle('bx-list-plus')
    }

    animationNameStart = () => {
        addButtonName.textContent = "Adicionado"
    }
    animationNameEnd = () => {
        addButtonName.textContent = "Adicionar"
    }
    
    setTimeout(animationButton, 0)
    setTimeout(animationNameStart, 0)
    setTimeout(animationNameEnd, 2000)
    setTimeout(animationButton, 3300)
})