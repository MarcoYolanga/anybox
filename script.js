
myfiles = document.querySelectorAll(".file a:not(.fileThumb)");
box_w = 100;
next_boxes_n = 4;
if(myfiles.length < 2)
  console.error("Not enough files", myfiles);
else {

  let next_boxes = "";
  for (var i = next_boxes_n; i > 0; i--) {
    next_boxes+='<div id="anybox_next'+i+'" class="anybox-next" style="right: '+(((next_boxes_n-i)*box_w)+20)+'px" onclick="mooove('+i+')"></div>';
  }
  document.body.innerHTML += "<div id='anybox-root'><div id='anybox'></div>"+next_boxes+"</div><style>#anybox{position: fixed; top: 10px; left: 10px; width: calc(100% - 20px); height: 90vh;background: #00000050;z-index: 99998} .anybox-next{z-index: 99999;position: fixed;top: 40px; height: "+box_w+"px; width: "+box_w+"px;background: #000000AA;opacity: .3;transition: .3s} .anybox-next:hover{opacity:1} #anybox > *, .anybox-next > *{max-width: 100%;max-height: 100%;display:block;margin: auto}</style>";
  document.onkeyup = checkKey;
  let strip = [];
  for(let file of myfiles)
    strip.push(file.href);
  myfiles = strip;
}


function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
      //up arrow
      document.getElementById('anybox-root').style.display = "block";
    }
    else if (e.keyCode == '40') {
        // down arrow
      document.getElementById('anybox-root').style.display = "none";
    }
    else if (e.keyCode == '37') {
       // left arrow
       mooove(-1)
    }
    else if (e.keyCode == '39') {
       // right arrow
       mooove(1)
    }
}
ANYBOX_INDEX = 0;
ANYBOX_INDEX_RESTORE = 0;
function mooove(by, box = 0){
  ANYBOX_INDEX+=by;
  if(ANYBOX_INDEX < 0)
    ANYBOX_INDEX = myfiles.length - 1;
  if(ANYBOX_INDEX > myfiles.length)
    ANYBOX_INDEX = 0;
    if(box == 0)
      ANYBOX_INDEX_RESTORE = ANYBOX_INDEX;
  let file = myfiles[ANYBOX_INDEX];
  let chunks = file.split('.');
  let extension = chunks[chunks.length - 1];
  let wrap = document.getElementById(box == 0 ? 'anybox' : 'anybox_next'+box);
  switch (extension) {
    case 'webm':
      wrap.innerHTML = '<video controls="" loop="" autoplay="" muted="" src="'+file+'"></video>';
      break;
    default:
      wrap.innerHTML = "<img src=\""+file+"\">";
  }
  if(box < next_boxes_n){
    if(by == 0)
      by = 1;
    mooove(by, box+1);
  }
  else{ //end of boxes, realign
      ANYBOX_INDEX = ANYBOX_INDEX_RESTORE;
  }
}

mooove(0);
