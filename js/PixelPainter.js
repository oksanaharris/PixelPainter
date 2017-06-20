/*jshint esversion: 6 */

let width;
let height=4;


var pixelPainter=document.getElementById("pixelPainter");
let canvasDiv=document.createElement("div");
canvasDiv.id='pp-canvas';

pixelPainter.appendChild(canvasDiv);





var clickHappenYet = false;

var selectedColor = 'green';


function grid(height, width, classStr, parent){
 for(i=1; i<=height; i++){
    for(j=1; j<=width; j++){
      var newCell=document.createElement('div');
      newCell.id = 'cell' + i + j;
      newCell.className=classStr;
      newCell.addEventListener('mousedown', fillColorOnClick);
      newCell.addEventListener('mouseenter', fillColorOnHover);
      newCell.addEventListener('mouseup', fillColorOnMouseUp);
      parent.appendChild(newCell);
    }
    var lineBreak=document.createElement('br');
    parent.appendChild(lineBreak);
 }

}
grid(10,10, 'canvasCells', canvasDiv);

function fillColorOnHover (e){
  if(clickHappenYet === true){
    var cellId = e.target.id;
    var cell = document.getElementById(cellId);
    cell.style.backgroundColor = selectedColor;
  }
}

function fillColorOnMouseUp (e){
  clickHappenYet = false;
}

function fillColorOnClick (e){
  clickHappenYet = true;
  var cellId = e.target.id;
  var cell = document.getElementById(cellId);
  cell.style.backgroundColor = selectedColor;
}

const toolBox=document.createElement("div");
const colorPalette=document.createElement("div");
toolBox.appendChild(colorPalette);

pixelPainter.appendChild(toolBox);
toolBox.id="toolBox";
colorPalette.id="colorPalette";

const clear = document.createElement("button");
const eraser = document.createElement("button");

toolBox.appendChild(clear);
toolBox.appendChild(eraser);

clear.innerHTML="clear";
eraser.innerHTML="eraser";
// toolBox.innerHTML="toolBox";

grid(5,2, 'canvasCells', colorPalette);