'use strict'

function renderCanvas() {
    const meme = getMeme()
    const img = new Image()
    img.src = getImgById(meme.selectedImgId).imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLines(meme)
    }
}

function drawLines(meme) {
    meme.lines.forEach(line => {
        if (!line.txt) return
        drawText(line.txt, line.pos.x, line.pos.y, line.fontSize)
    });
}

function drawText(txt, x, y, size) {
    gCtx.lineWidth = gElCanvas.width / 200
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `${size}px Impact`
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function getCanvasSize() {
    return gElCanvas.width
}