"use strict"

let gElCanvas
let gCtx
let imgId
let isUpload = false
let uploadImage
let gCurrLine
let gBrush = {
    size: 60,
    font: 'impact',
    color: 'black',
    borderColor: 'black'
}

function initCanvas(img) {
    let elimg = document.getElementById(img.id)
    imgId = img.id
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    clearData()
    gCtx.beginPath()
    gCtx.drawImage(elimg, 0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.stroke()
    addStartLines()
    renderCanvas()
    let elInput = document.querySelector('[name = addLine]')
    elInput.value='edit here'
}

function renderCanvas(border=0) {
    let elimg 
    if(!isUpload) elimg = document.getElementById(imgId)
    else elimg = uploadImage
    gCtx.beginPath()
    gCtx.drawImage(elimg, 0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.stroke()
    gLines.forEach(line => {
        gCtx.beginPath()
        gCtx.fillStyle = line.color
        if(gCurrLine!=-1 && gCurrLine.id===line.id && border===0)  gCtx.strokeStyle = 'yellow';
        else gCtx.strokeStyle = line.borderColor;
        gCtx.font = line.size + 'px' + ' ' + line.font
        gCtx.fillText(line.text, line.pos.x, line.pos.y);
        gCtx.fill();
        gCtx.strokeText(line.text, line.pos.x, line.pos.y);
        gCtx.stroke()
    })
}

function onAddLine() {
    let elInput = document.querySelector('[name = addLine]')
    let text = elInput.value
    if(text==='') return
    gCurrLine = addLine(text)
    renderCanvas()
}

function onEditLine(){
    if(gCurrLine===-1) return
    let elInput = document.querySelector('[name = addLine]')
    gCurrLine.text = elInput.value
    if(elInput.value==='')
    deleteLine(gCurrLine)
    renderCanvas()
}

function onDeleteLine(){
    if(gCurrLine===-1) return
    deleteLine(gCurrLine)
    gCurrLine=-1
    renderCanvas()
}

function onChangeLine() {
    gCurrLine = getNextLine()
    if(gCurrLine!=-1){
        let elInput = document.querySelector('[name = addLine]')
        elInput.value=gCurrLine.text
    }
    renderCanvas()
}

function onMoveX(val){
    if(gCurrLine===-1) return
    gCurrLine.pos.x+=val
    renderCanvas()
}

function onMoveY(val){
    if(gCurrLine===-1) return
    gCurrLine.pos.y+=val
    renderCanvas()
}

function addSticker(val){
    let text
    if(val==1) text='😂'
    if(val==2) text='😒'
    if(val==3) text='😭'
    gCurrLine = addLine(text)
    renderCanvas()
}

function setColor(val) {
    gBrush.color = val
    if(gCurrLine != -1) gCurrLine.color=val
    renderCanvas()
}

function setBorderColor(val) {
    gBrush.borderColor = val
    if(gCurrLine != -1) gCurrLine.borderColor=val
    renderCanvas(1)
}
function setSize(val) {
    gBrush.size = val
    if(gCurrLine != -1) gCurrLine.size=val
    renderCanvas()
}

function setFont(val) {
    gBrush.font = val
    if(gCurrLine != -1) gCurrLine.font=val
    renderCanvas()
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme';
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    
    let reader = new FileReader()
    reader.onload = (event) => {
        let img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    isUpload = true
    uploadImage = img
    renderCanvas()
}
