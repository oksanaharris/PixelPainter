  /*jshint esversion: 6 */

window.PixelPainter = function(height, width){

  var main=document.getElementById("pixelPainter");

  main.addEventListener('mouseup', fillColorOnMouseUp);

  var titleContainer = document.createElement('div');
  titleContainer.id = 'titleContainerDiv';
  main.appendChild(titleContainer);

  var titleCanvas = document.createElement('div');
  titleCanvas.id = 'titleCanvas';
  titleContainer.appendChild(titleCanvas);


  var titleToColor = [];

  var pageContents = document.createElement('div');
  pageContents.id='contents';
  main.appendChild(pageContents);

  var canvasDiv=document.createElement("div");
  canvasDiv.id='pp-canvas';

  pageContents.appendChild(canvasDiv);

  var clickHappenYet = false;

  var selectedColor = '#ffd9d9';

  var colorToFill;

  var toolPicked;


  function pageTitleGrid(height, width){
   for(i = 1; i <= height; i++){
      for(j = 0; j <= width; j++){
        var newCell = document.createElement('div');
        newCell.id = 'titleCell' + i+'-' +j;
        newCell.className = 'titleCell';
        newCell.style.backgroundColor = '#fffafa';
        titleCanvas.appendChild(newCell);
      }
      var lineBreak=document.createElement('br');
      titleCanvas.appendChild(lineBreak);
   }
  }

  pageTitleGrid(9,51);

  var titleLetterArr = ["titleCell3-2", "titleCell4-2", "titleCell5-2", "titleCell6-2", "titleCell7-2", "titleCell3-3", "titleCell4-4", "titleCell5-3", "titleCell4-6", "titleCell3-6", "titleCell5-6", "titleCell6-6", "titleCell7-6", "titleCell3-8", "titleCell4-9", "titleCell5-10", "titleCell6-11", "titleCell7-12", "titleCell7-8", "titleCell6-9", "titleCell4-11", "titleCell3-12", "titleCell3-14", "titleCell4-14", "titleCell5-14", "titleCell6-14", "titleCell7-14", "titleCell7-15", "titleCell7-16", "titleCell5-15", "titleCell5-16", "titleCell3-15", "titleCell3-16", "titleCell3-18", "titleCell4-18", "titleCell5-18", "titleCell6-18", "titleCell7-18", "titleCell7-19", "titleCell7-20", "titleCell7-23", "titleCell6-23", "titleCell5-23", "titleCell4-23", "titleCell3-23", "titleCell3-24", "titleCell4-25", "titleCell5-24", "titleCell7-26", "titleCell6-27", "titleCell5-27", "titleCell4-28", "titleCell3-28", "titleCell5-29", "titleCell6-29", "titleCell7-30", "titleCell6-28", "titleCell3-32", "titleCell4-32", "titleCell5-32", "titleCell6-32", "titleCell7-32", "titleCell3-34", "titleCell4-34", "titleCell5-34", "titleCell6-34", "titleCell7-34", "titleCell5-35", "titleCell6-36", "titleCell7-37", "titleCell5-37", "titleCell4-37", "titleCell3-37", "titleCell3-39", "titleCell3-40", "titleCell3-41", "titleCell4-40", "titleCell5-40", "titleCell6-40", "titleCell7-40",  "titleCell7-43", "titleCell7-44", "titleCell7-45", "titleCell6-43", "titleCell5-43", "titleCell5-44", "titleCell5-45", "titleCell4-43", "titleCell3-43", "titleCell3-44", "titleCell3-45", "titleCell3-47", "titleCell4-47", "titleCell5-47", "titleCell6-47", "titleCell7-47", "titleCell6-49", "titleCell7-49", "titleCell5-48", "titleCell4-49", "titleCell3-48"];

  var cellToFill;

  var randomColor;

  var titleColors = ['#6dc5fb','#e30c4d', '#62d9cf', '#cb4aab', 'purple', '#fa8072'];

  for (var y = 0; y < titleLetterArr.length; y++){
    randomColor = titleColors[(Math.floor(Math.random()*6))];
    cellToFill = document.getElementById(titleLetterArr[y]);
    cellToFill.style.backgroundColor = randomColor;
    cellToFill.style.border = 'solid 1px black';
    cellToFill.style.borderRadius = '2px';
    cellToFill.addEventListener('mousedown', fillColorOnClick);
    cellToFill.addEventListener('mouseenter', fillColorOnHover);
    // cellToFill.addEventListener('mouseup', fillColorOnMouseUp);
  }

  setInterval (function refreshTitleColors(){
    for (var y = 0; y < titleLetterArr.length; y++){
      randomColor = titleColors[(Math.floor(Math.random()*6))];
      cellToFill = document.getElementById(titleLetterArr[y]);
      cellToFill.style.backgroundColor = randomColor;
    }
  }, 100);

  function canvasGrid(gridHeight, gridWidth, classStr, parent){
    for(i=1; i<=gridHeight; i++){
      for(j=1; j<=gridWidth; j++){
        var newCell=document.createElement('div');
        newCell.id = 'cell' + i+'-' +j;
        newCell.className=classStr;
        newCell.style.backgroundColor = '#fffafa';
        parent.appendChild(newCell);
      }
      var lineBreak=document.createElement('br');
      parent.appendChild(lineBreak);
    }

    for(k=2; k<=(gridHeight-1); k++){
      for(l=2; l<=(gridWidth-1); l++){
        var targetId = 'cell' + k + '-' + l;
        var targetEl = document.getElementById(targetId);
        targetEl.addEventListener('mousedown', fillColorOnClick);
        targetEl.addEventListener('mouseenter', fillColorOnHover);
        targetEl.addEventListener('mouseup', fillColorOnMouseUp);
        targetEl.dataset.y = k;
        targetEl.dataset.x = l;
      }
    }
  }

  function actualFill (e){

    var colorToReplace = e.target.style.backgroundColor;

    var arr = [];

    arr.push(e.target.id);

    function findUpperBoundary (cellId){
      var passedInCell = document.getElementById(cellId);
      let x = passedInCell.dataset.x;
      let y = passedInCell.dataset.y;

      for (var i = y; i > 1; i --){
        checkCell = document.getElementById('cell' + i + '-' + x);
        if (checkCell.style.backgroundColor !== colorToReplace){
          break;
        }
      }
      let topBoundary = Number(i) + 1;
      let topCellId = 'cell' + topBoundary + '-' + x;
      return topCellId;
    }


    function stepDownFillFindOthers(){
      var current = arr.shift();
      var topCell = findUpperBoundary(current);

      var topY = document.getElementById(topCell).dataset.y;
      var topX = document.getElementById(topCell).dataset.x;

      var currentCell;
      var nextCell;

      var foundLeft = false;
      var foundRight = false;

      var leftNeighbor;
      var rightNeighbor;

      for (var j = topY; j < 25; j++){
        currentCell = document.getElementById('cell' + j + '-' + topX);
        currentCell.style.backgroundColor = selectedColor;
        
        leftNeighbor = document.getElementById('cell' + j + '-' + (Number(topX)-1));
        if (leftNeighbor.style.backgroundColor === colorToReplace){
          if (foundLeft === false){
            // leftNeighbor.style.backgroundColor = 'red';
            arr.push(leftNeighbor.id);
            foundLeft = true;
          }
        } else {
          foundLeft = false;
        }

        rightNeighbor = document.getElementById('cell' + j + '-' + (Number(topX)+1));
        if (rightNeighbor.style.backgroundColor === colorToReplace){
          if (foundRight === false){
            // rightNeighbor.style.backgroundColor = 'green';
            arr.push(rightNeighbor.id);
            foundRight = true;
          }
        } else {
          foundRight = false;
        }

        nextCell = document.getElementById('cell' + (Number(j)+1) + '-' + topX);
        if (nextCell.style.backgroundColor !== colorToReplace){
          break;
        }
      }

      return arr;
    }

    while (arr[0]){
      stepDownFillFindOthers();
    }
  }

  canvasGrid(height, width, 'canvasCells', canvasDiv);

  function colorCanvasBorder (width, height){
    var borderColor = '#939393';
    var borderHeight = '7px';
    var borderWidth = '7px';

    for (var i = 1; i <= width; i++){
      var topBorderCellId = 'cell' + 1 + '-' + i;
      var bottomBorderCellId = 'cell' + height + '-' + i;
      document.getElementById(topBorderCellId).style.backgroundColor = borderColor;
      document.getElementById(topBorderCellId).style.height = borderHeight;
      document.getElementById(bottomBorderCellId).style.backgroundColor = borderColor;
      document.getElementById(bottomBorderCellId).style.height = borderHeight;
      document.getElementById(topBorderCellId).style.boxShadow = "inset 0px 3px 0px rgba(255, 255, 255, .4)";
      document.getElementById(bottomBorderCellId).style.boxShadow = "inset 0px 3px 0px rgba(255, 255, 255, .4)";
    }

    for (var j = 1; j <= height; j++){
      var leftBorderCellId = 'cell' + j + '-' + 1;
      var rightBorderCellId = 'cell' + j + '-' + width;
      document.getElementById(leftBorderCellId).style.backgroundColor = borderColor;
      document.getElementById(leftBorderCellId).style.width = borderWidth;
      document.getElementById(rightBorderCellId).style.backgroundColor = borderColor;
      document.getElementById(rightBorderCellId).style.width = borderWidth;
      document.getElementById(leftBorderCellId).style.boxShadow = "inset 3px 0px 0px rgba(255, 255, 255, .4)";
      document.getElementById(rightBorderCellId).style.boxShadow = "inset 3px 0px 0px rgba(255, 255, 255, .4)";
    }

    document.getElementById('cell' + 1 + '-' + 1).style.borderRadius = '5px 0px 0px 0px';

    document.getElementById('cell' + 1 + '-' + 1).style.boxShadow = "inset 3px 3px 0px rgba(255, 255, 255, .4)";

    document.getElementById('cell' + 1 + '-' + width).style.borderRadius = '0px 5px 0px 0px';

    document.getElementById('cell' + height + '-' + width).style.borderRadius = '0px 0px 5px 0px';

    document.getElementById('cell' + height + '-' + width).style.boxShadow = "inset 0px 0px 0px rgba(255, 255, 255, .4)";

    document.getElementById('cell' + height + '-' + 1).style.borderRadius = '0px 0px 0px 5px';
  }

  colorCanvasBorder(width, height);

  function colorTitleBorder (width, height){
    var borderColor = '#939393';
    var borderHeight = '7px';
    var borderWidth = '7px';

    for (var i = 0; i <= width; i++){
      var topBorderCellId = 'titleCell' + 1 + '-' + i;
      var bottomBorderCellId = 'titleCell' + height + '-' + i;
      document.getElementById(topBorderCellId).style.backgroundColor = borderColor;
      
      document.getElementById(topBorderCellId).style.height = borderHeight;
      document.getElementById(bottomBorderCellId).style.backgroundColor = borderColor;
      document.getElementById(bottomBorderCellId).style.height = borderHeight;

      document.getElementById(topBorderCellId).style.boxShadow = "inset 0px 3px 0px rgba(255, 255, 255, .4)";
      document.getElementById(bottomBorderCellId).style.boxShadow = "inset 0px 3px 0px rgba(255, 255, 255, .4)";
    }

    for (var j = 1; j <= height; j++){
      var leftBorderCellId = 'titleCell' + j + '-' + 0;
      var rightBorderCellId = 'titleCell' + j + '-' + width;
      document.getElementById(leftBorderCellId).style.backgroundColor = borderColor;
      
      document.getElementById(leftBorderCellId).style.width = borderWidth;
      document.getElementById(rightBorderCellId).style.backgroundColor = borderColor;
      document.getElementById(rightBorderCellId).style.width = borderWidth;

      document.getElementById(leftBorderCellId).style.boxShadow = "inset 3px 0px 0px rgba(255, 255, 255, .4)";
      document.getElementById(rightBorderCellId).style.boxShadow = "inset 3px 0px 0px rgba(255, 255, 255, .4)";
    }

    document.getElementById('titleCell' + 1 + '-' + 0).style.borderRadius = '5px 0px 0px 0px';

    document.getElementById('titleCell' + 1 + '-' + 0).style.boxShadow = "inset 3px 3px 0px rgba(255, 255, 255, .4)";

    document.getElementById('titleCell' + 1 + '-' + width).style.borderRadius = '0px 5px 0px 0px';

    document.getElementById('titleCell' + height + '-' + width).style.borderRadius = '0px 0px 5px 0px';

    document.getElementById('titleCell' + height + '-' + width).style.boxShadow = "inset 0px 0px 0px rgba(255, 255, 255, .4)";

    document.getElementById('titleCell' + height + '-' + 0).style.borderRadius = '0px 0px 0px 5px';
  }

  colorTitleBorder(51,9);

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

      case 'actualFill':
        actualFill(e);
        break;

      case 'eraser':
        e.target.style.backgroundColor = '#fffafa';
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
          e.target.style.backgroundColor = '#fffafa';
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

  pageContents.appendChild(toolBox);
  toolBox.id="toolBox";
  colorPalette.id="colorPalette";

  function paletteGrid(height, width, parent){
   for(i=1; i<=height; i++){
      for(j=1; j<=width; j++){
        //these are either divs or buttons
        var newCell=document.createElement('div');
        newCell.id = 'color' + i + '-' + j;
        newCell.className = 'paletteCells';
        newCell.addEventListener('click', pickColor);
        parent.appendChild(newCell);
      }
      var lineBreak=document.createElement('br');
      parent.appendChild(lineBreak);
   }

   document.getElementById('color1-1').className = 'paletteCells activeColor';
  }

  paletteGrid (5,2, colorPalette);

  var chosenColors = ['#ffd9d9','#f6f68c', '#f283d1', '#6dc5fb', '#8affa4', '#62d9cf', '#cb4aab', 'purple', 'rgb(54, 4, 67)', '#d0b3cc'];

  var colorPaletteEls = document.getElementsByClassName('paletteCells');

  for (var k = 0; k < colorPaletteEls.length; k++){
    colorPaletteEls[k].style.backgroundColor = chosenColors[k];
  }

  function pickColor (e) {
    selectedColor = e.target.style.backgroundColor;
    displayActiveColor(e);

    if (toolPicked === 'eraser'){
      toolPicked = 'brush';

      document.getElementById('eraser').className = 'toolBoxButton';
      document.getElementById('brush').className = 'toolBoxButton clickedButton';
      }
  }

  function displayActiveColor(e){
    var allColors = document.getElementsByClassName('paletteCells');
    for (var i = 0; i < allColors.length; i++){
      allColors[i].className = 'paletteCells';
    }

    e.target.className += ' ' +'activeColor';
  }

  function clearFunc (e) {
    for(k=2; k<=24; k++){
      for(l=2; l<=51; l++){
        var targetId = 'cell' + k + '-' + l;
        var targetEl = document.getElementById(targetId);
        targetEl.style.backgroundColor = '#fffafa';
      }
    }
  }


  var buttonsLineOne = document.createElement('div');
  buttonsLineOne.id = 'toolsLineOne';
  toolBox.appendChild(buttonsLineOne);

  var buttonsLineTwo = document.createElement('div');
  toolBox.appendChild(buttonsLineTwo);
  
  const brushButton = document.createElement('img');
  brushButton.src = 'paint_brush.png';
  brushButton.id = 'brush';
  brushButton.className = 'toolBoxButton clickedButton';
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
  buttonsLineTwo.appendChild(document.createElement('br'));
  clear.innerHTML="Start over";

  const experimentalBtn = document.createElement('button');
  experimentalBtn.id = 'actualFill';
  experimentalBtn.addEventListener("click", selectTool);
  experimentalBtn.className = 'toolBoxButton';
  buttonsLineTwo.appendChild(experimentalBtn);
  experimentalBtn.innerHTML = 'F';

  function selectTool(e){
    switch (e.target.id){
      case 'fill':
        toolPicked = 'fill';
        break;
      case 'brush':
        toolPicked = 'brush';
        break;
      case 'eraser':
        toolPicked = 'eraser';
        break;
      case 'actualFill':
        toolPicked = 'actualFill';
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

PixelPainter(25,52);


