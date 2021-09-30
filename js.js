'use strict'
//Переменные
var canvas = document.getElementById("textCanvas");
var context = canvas.getContext("2d");
var maxWidth = document.querySelector('.resultIMG').offsetWidth; //размер поле, где выводится текст
var lineHeight = 30;
var imageElem = document.getElementById('image');
var marginLeft = 20;
var marginTop = 40;
let RazmerShrifta;
let Srift;
let qwe;
// context.fillStyle = "#4169e1";

//Перенос текста со всеми enter'ами, пробелами.
function wrapTex (text, x, y, maxWidth, lineHeight) {
  var lines = text.split("\n");

  for (var i = 0; i < lines.length; i++) {

      var words = lines[i].split(' ');
      var line = '';

      for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
              line = words[n] + ' ';
              y += lineHeight;
          } else {
              line = testLine;
          }
      }

      context.fillText(line, x, y);
      y += lineHeight;
  }
  document.querySelector('#image').style.display = 'block';
  return (imageElem.src = context.canvas.toDataURL());
  
};

    
document.querySelector('#SendBtn').onclick = () =>{
    context.clearRect(0, 0, canvas.width, canvas.height);//Отчистка канвы
    RazmerShrifta = document.querySelector('#sriftRazmer').value;
    Srift = document.querySelector('#shrift').value;
    document.querySelector('#text').fontFamtly = `${Srift}`;
    document.querySelector('#text').fontSize = `${RazmerShrifta}`;
    context.font = `${RazmerShrifta} ${Srift}`;
    context.fillStyle = document.querySelector('#color_font').value;
    setTimeout(TochnoStart,1000);

}


let TochnoStart = () =>{
  context.font = `${RazmerShrifta} ${Srift}`;
  setTimeout(er,200);
}

let er = () =>{
  setTimeout(wrapTex(document.querySelector('#text').value, marginLeft, marginTop, maxWidth,lineHeight),500);
}



//SAVE RESULT IMAGE

document.querySelector('#SettingsSaveBtnNotif').onclick =  () =>{
  var srC = document.querySelector('#image').src;
  var link = document.createElement('a');
	link.setAttribute('href', `${srC}`);
	link.setAttribute('download', 'resultTextImage.png');
	link.click();
	return false;
}


document.querySelector('.settings').onclick = () =>{
  let set = document.querySelector('.settings_block_show');
  let text = document.querySelector('.textArea');
  if(set.style.display == 'none'){
    set.style.display = 'block';
    text.style.display = 'none';
  }
  else{
    set.style.display = 'none';
    text.style.display = 'block';
  }
}