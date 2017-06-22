  /*jshint esversion: 6 */

window.PixelPainter = function(height, width){

  var main=document.getElementById("pixelPainter");
  let canvasDiv=document.createElement("div");
  canvasDiv.id='pp-canvas';


  main.appendChild(canvasDiv);

  var clickHappenYet = false;

  var selectedColor = 'green';

  var colorToFill;

  var toolPicked;

  function canvasGrid(gridHeight, gridWidth, classStr, parent){
   for(i=1; i<=gridHeight; i++){
      for(j=1; j<=gridWidth; j++){
        var newCell=document.createElement('div');
        newCell.id = 'cell' + i+'-' +j;
        newCell.className=classStr;
        newCell.style.backgroundColor = 'white';
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

  function fillColorOnClick (e){
    clickHappenYet = true;

    switch (toolPicked){
      case 'fill':
        colorToFill=e.target.style.backgroundColor;
        var allCanvasCells = document.getElementsByClassName('canvasCells');
        for (let i = 0; i < allCanvasCells.length; i++){
          if(allCanvasCells[i].style.backgroundColor === colorToFill){
            allCanvasCells[i].style.backgroundColor = selectedColor;
          }
        }
        fillClicked = false;
        break;

      case 'eraser':
        e.target.style.backgroundColor = 'white';
        break;

      case 'brush':
        clickHappenYet = true;
        e.target.style.backgroundColor = selectedColor;
        break;

      default:
        clickHappenYet = true;
        e.target.style.backgroundColor = selectedColor;
        break;
    }

  }

  function fillColorOnHover (e){
    if(clickHappenYet === true){
      switch (toolPicked){
        case 'eraser':
          e.target.style.backgroundColor = 'white';
          break;
        case 'brush':
          e.target.style.backgroundColor = selectedColor;
          break;
        default:
          e.target.style.backgroundColor = selectedColor;
          break;
        }
    }
  }

  function fillColorOnMouseUp (e){
    clickHappenYet = false;
  }

  const toolBox=document.createElement("div");

  const colorPalette=document.createElement("div");
  toolBox.appendChild(colorPalette);

  pixelPainter.appendChild(toolBox);
  toolBox.id="toolBox";
  colorPalette.id="colorPalette";

  function paletteGrid(height, width, classStr, parent){
   for(i=1; i<=height; i++){
      for(j=1; j<=width; j++){
        //these are either divs or buttons
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

    displayActiveColor(e);
  }

  function displayActiveColor(e){
    var allColors = document.getElementsByClassName('paletteCells');
    for (var i = 0; i < allColors.length; i++){
      allColors[i].className = 'paletteCells';
    }

    e.target.className += ' ' +'activeColor';
  }

  function clearFunc (e) {
    var allCanvasCells = document.getElementsByClassName('canvasCells');
    for (var i = 0; i < allCanvasCells.length; i++){
      allCanvasCells[i].style.backgroundColor = 'white';
    }
  }


  var buttonsLineOne = document.createElement('div');
  toolBox.appendChild(buttonsLineOne);

  var buttonsLineTwo = document.createElement('div');
  toolBox.appendChild(buttonsLineTwo);
  
  const brushButton = document.createElement('img');
  brushButton.src = 'paint_brush.png';
  brushButton.id = 'brush';
  brushButton.className = 'toolBoxButton';
  brushButton.addEventListener('click', selectTool);
  buttonsLineOne.appendChild(brushButton);

  // const brushImg = document.createElement('img');
  // brushImg.className = 'toolBoxButtonImg';
  // brushImg.src = 'paint_brush.jpg';
  // brushButton.appendChild(brushImg);

  const fillButton = document.createElement('img');
  fillButton.src = 'paint_bucket.png';
  fillButton.id = 'fill';
  fillButton.className = 'toolBoxButton';
  fillButton.addEventListener('click', selectTool);
  buttonsLineOne.appendChild(fillButton);

  // const fillImg = document.createElement('img');
  // fillImg.className = 'toolBoxButtonImg';
  // fillImg.src = 'paint_bucket.png';
  // fillButton.appendChild(fillImg);

  const eraserButton = document.createElement('img');
  eraserButton.src = 'eraser.png';
  eraserButton.id = 'eraser';
  eraserButton.className = 'toolBoxButton';
  eraserButton.addEventListener('click', selectTool);
  buttonsLineTwo.appendChild(eraserButton);

  // const eraserImg = document.createElement('img');
  // eraserImg.className = 'toolBoxButtonImg';
  // eraserImg.src = 'eraser.png';
  // eraserButton.appendChild(eraserImg);

  const clear = document.createElement('img');
  clear.src = 'new_page.png';
  clear.addEventListener("click", clearFunc);
  clear.id = 'clearBtn';
  buttonsLineTwo.appendChild(clear);
  clear.innerHTML="Start over";

  function selectTool(e){
    switch (e.target.id){
      case 'fill':
        toolPicked = 'fill';
        break;
      case 'brush':
        toolPicked = 'brush';
        // document.body.style.cursor = 'crosshair';
        break;
      case 'eraser':
        toolPicked = 'eraser';
        break;
      default:
        toolPicked = 'brush';
        break;
    }

    displayActiveTool(e);
  }

  function displayActiveTool (e){
    var allToolButtons = document.getElementsByClassName('toolBoxButton');
    for (var i = 0; i < allToolButtons.length; i++){
      allToolButtons[i].className = 'toolBoxButton';
    }

    e.target.className += ' ' +'clickedButton';
  }
};

PixelPainter(30,30);
