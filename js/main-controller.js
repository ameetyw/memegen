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
    initCanvas(imgId)
    addListeners()
}

function initCanvas(imgId) {
    resizeCanvas()
    initMeme(imgId)
    renderLineText()
    // renderCanvas()
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
    // resetLineInput()
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'grid'
    // document.querySelector('.editor').hidden = true
    // document.querySelector('.gallery').hidden = false
}



function addListeners() {
    // input text
    const elInputTxt = document.querySelector('.controls textarea')
    elInputTxt.addEventListener('input', () => editLine(elInputTxt.value))
    
    // new line
    const elAddLine = document.querySelector('.add-line')
    elAddLine.addEventListener('click', () => {
        addLine()
        renderLineText()
        // resetLineInput()
    })

    // choose next line
    const elChooseNext = document.querySelector('.choose-next')
    elChooseNext.addEventListener('click', () => {
        selectNextLine()
        renderLineText()
    })
    
    // font size
    const elLargerFont = document.querySelector('.larger-font')
    elLargerFont.addEventListener('click', () => changeFontSize(5))
    const elSmallerFont = document.querySelector('.smaller-font')
    elSmallerFont.addEventListener('click', () => changeFontSize(-5))
    
    // move text vertically
    const elMoveUp = document.querySelector('.move-up')
    elMoveUp.addEventListener('click', () => moveLineVertical(-5))
    const elMoveDown = document.querySelector('.move-down')
    elMoveDown.addEventListener('click', () => moveLineVertical(5))
    // align text horizontally
    const elFontLeft = document.querySelector('.font-left')
    elFontLeft.addEventListener('click', () => alignLine('left'))
    const elFontCenter = document.querySelector('.font-center')
    elFontCenter.addEventListener('click', () => alignLine('center'))
    const elFontRight = document.querySelector('.font-right')
    elFontRight.addEventListener('click', () => alignLine('right'))
}

function renderLineText() {
    document.querySelector('.controls textarea').value = getLineText()
}

function getCanvasSize() {
    return gElCanvas.width
}
