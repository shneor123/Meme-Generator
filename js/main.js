"use strict"

function OnImgClick(img) {
    toggleModal()
    initCanvas(img)
}

function toggleModal() {
    if (isUpload === true) isUpload = false
    let elBlur = document.querySelector('.modal-blur')
    elBlur.classList.toggle('view')
    let elModal = document.querySelector('.modal-container')
    elModal.classList.toggle('view-modal')
}

function renderGallery(all = false) {
    let strHTML = ''
    let search = document.querySelector('[name=search]').value
    if (all) search = ''
    let elContainer = document.querySelector('.gallery-container')
    gMemes.forEach(meme => {
        if (meme.name.includes(search)) {
            strHTML += `<div class="gallery-item"><img class="gallery-img" id="${meme.id}" 
            src=${meme.src} onclick="OnImgClick(this)">
            <p>${meme.name}<p>
            </div>`
        }
    })
    elContainer.innerHTML = strHTML
}