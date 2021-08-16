'use strict'

const gElCanvas = document.querySelector('canvas')
const gSectionNames = ['gallery', 'editor', 'saved-memes', 'about']
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
let gLastSelectedFont
let gStartPos


function onInit() {
    createImages()
    renderGallery()
    loadSavedMemes()
}

function renderGallery() {
    let images = getImages()
    let strHtmls = images.map(img => {
        return `<img class="gallery-img" src="${img.imgUrl}" alt="img${img.id}" onclick="onOpenNewMeme(${img.id})" />`
    })
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}

function onOpenNewMeme(imgId) {
    onShowSection('editor')
    initCanvas()
    resizeCanvas()
    initMeme(imgId)
    renderCanvas()
    gElCanvas.style.cursor = 'grab'
}

function onShowSection(sectionName) {
    if (sectionName === 'home') {
        onShowSection('gallery')
        document.querySelector('.about').classList.remove('hidden')
        return
    }
    gSectionNames.forEach(section => {
        const elSection = document.querySelector(`.${section}`)
        if (section === sectionName) {
            if (elSection.classList.contains('hidden')) {
                elSection.classList.remove('hidden')
            }
        } else if (!elSection.classList.contains('hidden')) elSection.classList.add('hidden')
    })
    if (sectionName === 'editor') {
        document.querySelector('.controls textarea').value = ''
        onChangeCanvasListeners('ON')
    }
    else {
        onChangeCanvasListeners('OFF')
        if (sectionName === 'saved-memes') onRenderSavedMemes()
    }
}

/*** canvas ***/

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 10
    gElCanvas.height = gElCanvas.width
}

function getCanvas() {
    return gElCanvas
}

function getCanvasSize() {
    return gElCanvas.width
}

/*** edit meme ***/

function onEditLine(txt) {
    if (isLineSelected()) {
        editLine(txt)
        renderCanvas()
    }
}

function onMoveLineUp() {
    if (isLineSelected()) {
        moveLineVertical(-5)
        renderCanvas()
    }
}

function onMoveLineDown() {
    if (isLineSelected()) {
        moveLineVertical(5)
        renderCanvas()
    }
}

function onSelectNextLine() {
    selectNextLine()
    renderCanvas()
    renderMemeControls()
}

function onAddLine() {
    addLine()
    renderCanvas()
    renderMemeControls()
}

function onRemoveLine() {
    if (isLineSelected()) {
        removeLine()
        renderCanvas()
        renderMemeControls()
    }
}

function onChangeFontSize(changeType) {
    if (isLineSelected()) {
        changeFontSize(changeType)
        renderCanvas()
    }
}

function onAlignLine(direction) {
    if (isLineSelected()) {
        alignLine(direction)
        renderCanvas()
    }
}

function onChangeFontStyle(fontStyle) {
    if (isLineSelected()) {
        changeFontStyle(fontStyle)
        renderCanvas()
    }
}

function onChangeBorderColor(color) {
    if (isLineSelected()) {
        changeBorderColor(color)
        renderCanvas()
    }
}

function onChangeFontColor(color) {
    if (isLineSelected()) {
        changeFontColor(color)
        renderCanvas()
    }
}

function onSaveMeme() {
    const elSaveBtn = document.querySelector('.save-meme')
    elSaveBtn.innerText = 'Saved!'
    setTimeout(() => elSaveBtn.innerText = 'Save', 700)
    saveMemeDataURL() 
    saveMemeToStorage()
}

function renderMemeControls() {
    renderLineText()
    renderSelectFont()
}

function renderLineText() {
    document.querySelector('.controls textarea').value = getCurrLineText()
}

function renderSelectFont() {
    document.querySelector('.choose-font').value = getCurrLineFont()
}

/**** canvas listeners ****/

function onChangeCanvasListeners(action) {
    if (action === 'ON') {
        gElCanvas.addEventListener('touchstart', onDown)
        gElCanvas.addEventListener('touchend', onUp)
        gElCanvas.addEventListener('mousedown', onDown)
        gElCanvas.addEventListener('mouseup', onUp)
    } else {
        gElCanvas.removeEventListener('touchstart', onDown)
        gElCanvas.removeEventListener('touchend', onUp)
        gElCanvas.removeEventListener('mousedown', onDown)
        gElCanvas.removeEventListener('mouseup', onUp)
    }
}

function onDown(ev) {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('mousemove', onMove)

    gStartPos = getEvPos(ev)
    doClick(gStartPos)
    renderCanvas()
    renderMemeControls()
}

function onMove(ev) {
    if (!isLineSelected()) return
    gElCanvas.style.cursor = 'grabbing'
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    renderCanvas()
    gStartPos = pos
}

function onUp() {
    gElCanvas.removeEventListener('touchmove', onMove)
    gElCanvas.removeEventListener('mousemove', onMove)
    gElCanvas.style.cursor = 'grab'

}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function onToggleShareModal() {
    const elScreen = document.querySelector('.screen')
    elScreen.hidden = !elScreen.hidden;
    const elModal = document.querySelector('.share-modal')
    elModal.hidden = !elModal.hidden;
}

function onDownloadMeme(elLink) {
    saveMemeDataURL()
    elLink.href = getMemeDataURL()
    onToggleShareModal()
}
