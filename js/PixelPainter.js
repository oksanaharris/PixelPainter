  /*jshint esversion: 6 */

window.PixelPainter = function(height, width){

  // var gridHeight=height;
  // var gridWidth=width;

  var main=document.getElementById("pixelPainter");
  let canvasDiv=document.createElement("div");
  canvasDiv.id='pp-canvas';

  main.appendChild(canvasDiv);

  var clickHappenYet = false;

  var selectedColor = 'green';


  function canvasGrid(gridHeight, gridWidth, classStr, parent){
   for(i=1; i<=gridHeight; i++){
      for(j=1; j<=gridWidth; j++){
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

  canvasGrid(height, width, 'canvasCells', canvasDiv);

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
    e.target.style.backgroundColor = selectedColor;
  }

  const toolBox=document.createElement("div");
  const colorPalette=document.createElement("div");
  toolBox.appendChild(colorPalette);

  pixelPainter.appendChild(toolBox);
  toolBox.id="toolBox";
  colorPalette.id="colorPalette";

  const clear = document.createElement("button");
  const eraser = document.createElement("button");
  eraser.addEventListener("click", eraserFunc);
  clear.addEventListener("click", clearFunc);

  toolBox.appendChild(clear);
  toolBox.appendChild(eraser);

  clear.innerHTML="clear";
  eraser.innerHTML="eraser";

  function paletteGrid(height, width, classStr, parent){
   for(i=1; i<=height; i++){
      for(j=1; j<=width; j++){
        var newCell=document.createElement('div');
        newCell.id = 'color' + i + j;
        newCell.className=classStr;
        newCell.addEventListener('click', pickColor);
        parent.appendChild(newCell);
      }
      var lineBreak=document.createElement('br');
      parent.appendChild(lineBreak);
   }
  }

  paletteGrid (2,5, 'paletteCells', colorPalette);

  var chosenColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'violet', 'black', 'white'];

  var colorPaletteEls = document.getElementsByClassName('paletteCells');

  for (var k = 0; k < colorPaletteEls.length; k++){
    colorPaletteEls[k].style.backgroundColor = chosenColors[k];
  }

  function pickColor (e) {
    selectedColor = e.target.style.backgroundColor;
  }

  function eraserFunc (e) {
    selectedColor = 'white';
  }

  function clearFunc (e) {
    var allCanvasCells = document.getElementsByClassName('canvasCells');
    for (var i = 0; i < allCanvasCells.length; i++){
      allCanvasCells[i].style.backgroundColor = 'white';
    }
  }
};
PixelPainter(25,25);
