'use strict'

let gCtx

function initCanvas() {
    gCtx = getCanvas().getContext('2d')
}

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
    gCtx.font = `${line.fontSize}px ${line.fontStyle}`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    setLineWidth(line, gCtx.measureText(line.txt).width)
}

function markCurrLine() {
    const currLine = getCurrLine()
    if (!currLine) return
    const { xStart, yStart, xWidth } = getBoxPos(currLine)
    gCtx.lineWidth = 4
    gCtx.beginPath()
    gCtx.rect(xStart, yStart, xWidth, currLine.fontSize * 1.25)
    gCtx.strokeStyle = '#ff7f00'
    gCtx.stroke()
}

function getBoxPos(line) {
    const gapSize = line.fontSize / 3
    const yStart = line.pos.y - line.fontSize
    const xWidth = line.width + gapSize * 2
    let xStart
    switch (line.align) {
        case 'center':
            xStart = line.pos.x - line.width / 2 - gapSize
            break
        case 'left':
            xStart = line.pos.x - gapSize
            break
        case 'right':
            xStart = line.pos.x - line.width - gapSize
    }
    return { xStart, yStart, xWidth }
}