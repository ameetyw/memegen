'use strict'

function renderCanvas() {
    const canvasSize = getCanvasSize()
    const meme = getMeme()
    const img = new Image()
    img.src = getImgById(meme.selectedImgId).imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, canvasSize, canvasSize)
        drawLines(meme)
        markCurrLine()
    }
}

function drawLines(meme) {
    meme.lines.forEach(line => drawText(line));
}

function drawText(line) {
    gCtx.lineWidth = line.fontSize / 25
    gCtx.strokeStyle = line.borderColor
    gCtx.fillStyle = line.fontColor
    gCtx.font = `${line.fontSize}px Impact`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function markCurrLine() {
    const currLine = getCurrLine()
    if (!currLine) return
    const canvasSize = getCanvasSize()
    const yStart = currLine.pos.y - currLine.fontSize
    const yEnd = yStart + currLine.fontSize
    gCtx.lineWidth = 5
    gCtx.beginPath()
    gCtx.rect(canvasSize / 20, yStart, canvasSize - canvasSize / 10, yEnd)
    gCtx.strokeStyle = '#ff7f00'
    gCtx.stroke()
}