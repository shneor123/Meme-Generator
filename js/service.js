"use strict"
let gLines=[]
function addLine(text){
    let line={
        id: _makeId(),
        pos: {x:100,y:300},
        font : gBrush.font,
        size : gBrush.size,
        color : gBrush.color,
        borderColor: gBrush.borderColor,
        text : text,
    }
    gLines.push(line)
    return line
}

function getNextLine(){
    if(gLines.length===0) return -1;
    let idx = gLines.findIndex((line) => line.id===gCurrLine.id)
    idx++
    if(idx===gLines.length){
        idx=-1
        return -1
    } 
    return gLines[idx]
}

function deleteLine(lineToRemove){
    const idx = gLines.findIndex((line) => line.id===lineToRemove.id)
    gLines.splice(idx,1)
}


function _makeId(length = 3) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
function clearData(){
    gLines=[]
}

function addStartLines(){
    gCurrLine = addLine('edit here')
    gCurrLine.pos.x=gElCanvas.width/3
    gCurrLine.pos.y=60
    gCurrLine.font='impact'
    gCurrLine.color='black'
    gCurrLine.borderColor='black'
    gCurrLine.size=60
    gCurrLine = addLine('edit here')
    gCurrLine.pos.x=gElCanvas.width/3
    gCurrLine.pos.y=gElCanvas.height*14/15
    gCurrLine.font='impact'
    gCurrLine.color='black'
    gCurrLine.borderColor='black'
    gCurrLine.size=60
    gCurrLine = gLines[0]
}

function getMeme(idx){
    return gMemes[idx]
}
function getLine(id){
    let line = gLines.find(line => line.id===id)
    return line
}