/*jshint esversion: 6 */

let width;
let height=4;

let canvasDiv=document.createElement("div");
canvasDiv.id='pp-canvas';

var pixelPainter=document.getElementById("pixelPainter");
pixelPainter.appendChild(canvasDiv);

var clickHappenYet = false;

var selectedColor = 'green';


function grid(height, width, classStr){
 for(i=1; i<=height; i++){
    for(j=1; j<=width; j++){
      var newCell=document.createElement('div');
      newCell.id = 'cell' + i + j;
      newCell.className=classStr;
      newCell.addEventListener('mousedown', fillColorOnClick);
      newCell.addEventListener('mouseenter', fillColorOnHover);
      newCell.addEventListener('mouseup', fillColorOnMouseUp);
      canvasDiv.appendChild(newCell);
    }
    var lineBreak=document.createElement('br');
    canvasDiv.appendChild(lineBreak);
 }

}
grid(10,10, 'canvasCells');

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