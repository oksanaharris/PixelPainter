let width
let height=4;

let canvasDiv=document.createElement("div");
canvasDiv.id='pp-canvas';

var pixelPainter=document.getElementById("pixelPainter");
pixelPainter.appendChild(canvasDiv);



function grid(height, width){
 for(i=0; i<height; i++){

    for(j=0; j<width; j++){
      var newCell=document.createElement('div');
      newCell.className='canvasCells';
      canvasDiv.appendChild(newCell);

    }
    var lineBreak=document.createElement('br');
    canvasDiv.appendChild(lineBreak);
 }

}
grid(2,3);