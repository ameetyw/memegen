'use strict'

let gElCanvas
let gCtx

function onInit() {
    // document.querySelector('.editor').style.display = 'none'
    createImages()
    renderGallery()
}

function renderGallery() {
    let images = getImages()
    let strHtmls = images.map(img => {
        return `<img class="gallery-img" src="${img.imgUrl}" alt="img${img.id}" onclick="onOpenImgEditor(${img.id})" />`
    })
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}

function onOpenImgEditor(imgId) {
    onShowEditor()
    onOpenCanvas(imgId)
}

function onOpenCanvas(imgId) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    createMeme(imgId)
    renderCanvas()
    addListeners()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 10
    gElCanvas.height = gElCanvas.width
}

function onShowEditor() {
    document.querySelector('.editor').style.display = 'grid'
    document.querySelector('.gallery').style.display = 'none'
    // document.querySelector('.editor').hidden = false
    // document.querySelector('.gallery').hidden = true
}

function onShowGallery() {
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'grid'
    // document.querySelector('.editor').hidden = true
    // document.querySelector('.gallery').hidden = false
}

function onCloseImgEditor() {
    resetLineInput()
    onShowGallery()
}

function addListeners() {
    const elInputTxt = document.querySelector('.controls textarea')
    elInputTxt.addEventListener('input', () => editLine(elInputTxt.value))
    const elAddLine = document.querySelector('.add-line')
    elAddLine.addEventListener('click', () => {
        resetLineInput()
        addLine()
    })
}

function resetLineInput() {
    document.querySelector('.controls textarea').value = ''
}