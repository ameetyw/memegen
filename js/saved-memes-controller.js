'use strict'

const MEMES_DB = 'memesDB'
const LAST_ID_DB = 'lastMemeID'

let gMemes

function saveMemeToStorage() {
    const meme = getMeme()
    const memeIdx = findMemeIdx()
    if (memeIdx < 0) gMemes.push(meme)
    else gMemes[memeIdx] = meme
    _saveMemesToStorage()
    saveToStorage(LAST_ID_DB, meme.id)
}

function loadSavedMemes() {
    gMemes = loadFromStorage(MEMES_DB)
    if (!gMemes) gMemes = []
}

function getLastIdFromStorage() {
    return loadFromStorage(LAST_ID_DB)
}

function onRenderSavedMemes() {
    let strHtmls
    if (!gMemes.length) strHtmls = ['No saved memes']
    else {
        strHtmls = gMemes.map((meme, idx) => {
            return `<img class="gallery-img" src="${meme.dataURL}" alt="meme" 
                onclick="onLoadMeme(${meme.id})"/>`
        })
    }
    document.querySelector('.memes-container').innerHTML = strHtmls.join('')
}

function onLoadMeme(memeId) {
    onShowSection('editor')
    setMeme(getMemeById(memeId))
    initCanvas()
    resizeCanvas()
    renderCanvas()
    renderMemeControls()
}

function onRemoveMeme() {
    const memeIdx = findMemeIdx()
    if (memeIdx) {
        gMemes.splice(memeIdx, 1)
        _saveMemesToStorage()
    }
    onShowSection('saved-memes')
}

function findMemeIdx() {
    const memeId = getMeme().id
    return gMemes.findIndex(meme => meme.id === memeId)
}

function getMemeById(memeId) {
    return gMemes.find(meme => { return meme.id === memeId })
}

function _saveMemesToStorage() {
    saveToStorage(MEMES_DB, gMemes)   
}