'use strict'

let gMeme
let gCurrLine

function initMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: -1,
        lines: []
    }
    addLine()
}

function createLine() {
    const line = {
        txt: 'Enter text',
        fontSize: getCanvasSize() / 10,
        align: 'center',
        fontColor: '#ffffff',
        borderColor: '#000000'
    }
    setLinePos(line)
    return line
}

function setLinePos(line) {
    const canvasSize = getCanvasSize()
    const lineIdx = gMeme.selectedLineIdx
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
    if (!lineIdx) line.pos.y = canvasSize / 7
    else if (lineIdx === 1) line.pos.y = canvasSize - canvasSize / 8 + line.fontSize / 2
    else line.pos.y = canvasSize / 2 + line.fontSize / 2
}

function alignLine(direction) {
    gCurrLine.align = direction
    setLinePos(gCurrLine)
    renderCanvas()
}

function selectNextLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = -1
        gCurrLine = null
        return
    }
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
}

function addLine() {
    gMeme.selectedLineIdx++
    gMeme.lines.push(createLine())
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
    renderCanvas()
}

function editLine(txt) {
    gCurrLine.txt = txt
    setLinePos(gCurrLine)
    renderCanvas()
}

function getMeme() {
    return gMeme
}

function changeFontSize(diff) {
    gCurrLine.fontSize += diff
    renderCanvas()
}

function moveLineVertical(diff) {
    gCurrLine.pos.y += diff
    renderCanvas()
}

function getLineText() {
    if (!gCurrLine) return '-No line selected-'
    else if (gCurrLine.txt === 'Enter text') return ''
    return gCurrLine.txt
}

function getCurrLine() {
    return gCurrLine
}