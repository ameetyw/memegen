'use strict'

let gImages = []
let gImgId = 0
let gImgCount = 18

function createImages() {
    for (let i = 1; i <= gImgCount; i++) {
        gImages.push(createImage(`img/${i}.jpg`))
    }
}

function createImage(imgUrl, keywords = []) {
    return {
        id: ++gImgId,
        imgUrl,
        keywords
    }
}

function getImages() {
    return gImages
}

function addImgKeywords(imgId, keywords) {
    const img = getImgById(imgId)
    if (!img) return
    img.keywords = keywords
}

function getImgById(imgId) {
    return gImages.find((img) => img.id === imgId)
}