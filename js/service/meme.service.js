'use strict'

let gMeme
let gCurrLine
let gMemeId

function initMeme(imgId) {
    gMemeId = getLastIdFromStorage()
    if (!gMemeId) gMemeId = 0

    gMeme = {
        id: ++gMemeId,
        selectedImgId: imgId,
        selectedLineIdx: -1,
        lines: []
    }
    addLine()
}

function createLine() {
    const line = {
        txt: 'Enter text',
        fontStyle: 'Impact',
        fontSize: getCanvasSize() / 8,
        align: 'center',
        fontColor: '#ffffff',
        borderColor: '#000000'
    }
    setLinePos(line)
    return line
}

function setLinePos(line) {
    const canvasSize = getCanvasSize()
    const linesCount = gMeme.lines.length
    if (!line.pos) line.pos = {}
    switch (line.align) {
        case 'center':
            line.pos.x = canvasSize / 2
            break
        case 'left':
            line.pos.x = canvasSize / 15
            break
        case 'right':
            line.pos.x = canvasSize - canvasSize / 15
    }
    if (line.pos.y) return
    if (!linesCount) line.pos.y = canvasSize / 6
    else if (linesCount === 1) line.pos.y = canvasSize - canvasSize / 8 + line.fontSize / 2
    else line.pos.y = canvasSize / 2 + line.fontSize / 2
}

function setLineWidth(line, width) {
    line.width = width
}

function addLine() {
    gMeme.lines.push(createLine())
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
    selectNextLine()
}

function changeFontSize(changeType) {
    let sizeDiff = gCurrLine.fontSize / 10
    sizeDiff *= (changeType === '+') ? 1 : -1
    gCurrLine.fontSize += sizeDiff
}

function alignLine(direction) {
    gCurrLine.align = direction
    setLinePos(gCurrLine)
}

function changeFontStyle(fontStyle) {
    gCurrLine.fontStyle = fontStyle
}

function changeBorderColor(color) {
    gCurrLine.borderColor = color
}

function changeFontColor(color) {
    gCurrLine.fontColor = color
}

/*** edit meme ***/

function editLine(txt) {
    gCurrLine.txt = txt
    setLinePos(gCurrLine)
}

function moveLineVertical(diff) {
    gCurrLine.pos.y += diff
}

function selectNextLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = -1
        gCurrLine = null
    }
    else gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
}

function doClick(pos) {
    gCurrLine = null
    gMeme.selectedLineIdx = -1
    gMeme.lines.some((line, idx) => {
        if (isLineClicked(line, pos)) {
            gCurrLine = line
            gMeme.selectedLineIdx = idx
            return true
        }
        return false
    })
}

function moveLine(dx, dy) {
    gCurrLine.pos.x += dx
    gCurrLine.pos.y += dy
}

function isLineClicked(line, pos) {
    let xLeft = line.pos.x
    switch (line.align) {
        case 'center':
            xLeft -= line.width / 2
            break
        case 'right':
            xLeft -= line.width
    }
    return ((pos.x >= xLeft && pos.x <= xLeft + line.width + 5) &&
        (pos.y >= line.pos.y - line.fontSize * 0.8 && pos.y <= line.pos.y))
}

/*** get meme info ***/

function getMeme() {
    return gMeme
}

function setMeme(meme) {
    gMeme = meme
    gCurrLine = gMeme.lines[0]
}

function getCurrLine() {
    return gCurrLine
}

function getCurrLineText() {
    if (!gCurrLine) return '-No line selected-'
    else if (gCurrLine.txt === 'Enter text') return ''
    return gCurrLine.txt
}

function getCurrLineFont() {
    if (!gCurrLine) return ''
    return gCurrLine.fontStyle
}

function isLineSelected() {
    return (gCurrLine != null)
}

/** save meme **/

function saveMemeDataURL() {
    gMeme.dataURL = getCanvas().toDataURL('image/jpeg')
}

function getMemeDataURL() {
    return gMeme.dataURL
}
