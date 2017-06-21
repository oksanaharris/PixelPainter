  /*jshint esversion: 6 */

window.PixelPainter = function(height, width){

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
        newCell.id = 'cell' + i+'-' +j;
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

  const clear = document.createElement("div");
  clear.addEventListener("click", clearFunc);
  clear.id = 'clearBtn';
  toolBox.appendChild(clear);
  clear.innerHTML="Start over";

  const colorPalette=document.createElement("div");
  toolBox.appendChild(colorPalette);

  pixelPainter.appendChild(toolBox);
  toolBox.id="toolBox";
  colorPalette.id="colorPalette";



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

  paletteGrid (5,2, 'paletteCells', colorPalette);

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

  const brushButton = document.createElement('div');
  brushButton.className = 'toolBoxButton';
  // brushButton.addEventListener('click', activateBrush);
  toolBox.appendChild(brushButton);

  const brushImg = document.createElement('img');
  brushImg.className = 'toolBoxButtonImg';
  brushImg.src = 'paint_brush.jpg';
  brushButton.appendChild(brushImg);

  const fillButton = document.createElement('div');
  fillButton.className = 'toolBoxButton';
  // fillButton.addEventListener('click', activateFill);
  toolBox.appendChild(fillButton);

  const fillImg = document.createElement('img');
  fillImg.className = 'toolBoxButtonImg';
  fillImg.src = 'paint_bucket.png';
  fillButton.appendChild(fillImg);

  const eraserButton = document.createElement('div');
  eraserButton.className = 'toolBoxButton';
  eraserButton.addEventListener('click', eraserFunc);
  toolBox.appendChild(eraserButton);

  const eraserImg = document.createElement('img');
  eraserImg.className = 'toolBoxButtonImg';
  eraserImg.src = 'eraser.png';
  eraserButton.appendChild(eraserImg);
};

PixelPainter(25,25);
