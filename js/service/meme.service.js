'use strict'

let gMeme

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
    }
    gMeme.lines = [createLine()]
}

function createLine() {
    return {
        txt: '',
        fontSize: getCanvasSize() / 10,
        align: 'center',
        color: 'white',
        // border: 'black'
    }
}

function addLine() {
    gMeme.selectedLineIdx++
    gMeme.lines.push(createLine())
}

function getMeme() {
    return gMeme
}

function editLine(txt) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.txt = txt
    currLine.pos = getLinePos(currLine)
    renderCanvas()
    // drawText(gMeme)
}

function getLinePos(line) {
    const canvasSize = getCanvasSize()
    const txt = line.txt
    const fontSize = line.fontSize
    const lineIdx = gMeme.selectedLineIdx
    const pos = {
        x: canvasSize / 2 - gCtx.measureText(txt).width / 2
    }
    if (!lineIdx) pos.y = canvasSize / 7
    else if (lineIdx === 1) pos.y = canvasSize - canvasSize / 7 - fontSize / 2
    else pos.y = canvasSize / 2 - fontSize / 2
    return pos
}