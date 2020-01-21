var arg;
var sig;
var canv;
var mouseIsDown = 0;
var posX,posY, context;
var oscillator,gOsc;
var audioContext;

(function init() {




canv = document.getElementById('synth-canvas');
context = canv.getContext("2d");
canv.addEventListener("mousedown",mouseDown,false);
canv.addEventListener("mousemove",mouseMove,false);
canv.addEventListener("touchstart",touchDown,false);
canv.addEventListener("touchend",touchUp,false);
canv.addEventListener("touchmove",touchMove,false);
canv.addEventListener("mouseup",mouseUp,false);

  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    if('webkitAudioContext' in window) {
	    	audioContext = new webkitAudioContext();
	}
	else
	{
		audioContext = new AudioContext();
	}
    oscillator = audioContext.createOscillator();
    gOsc = audioContext.createGain();
    
    
    oscillator.connect(gOsc);
    gOsc.connect(audioContext.destination);
    oscillator.type = 0;
    gOsc.gain.value = 0;
    oscillator.start(1);
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser, try latest google chrome');
  }

	

function mouseDown()
{
	mouseIsDown = 1;
	mouseMove();
}

function mouseUp()
{
	mouseIsDown = 0;
	gOsc.gain.value = 0;
}

function touchDown()
{
	mouseIsDown = 1;
	
	touchMove();
}

function touchUp()
{
	mouseIsDown = 0;
	gOsc.gain.value = 0;
	showPos();
}

function mouseMove(e)
{
	if(!e)
		var e = event;
	if(mouseIsDown){
	e.preventDefault();
	posX = e.pageX - canv.offsetLeft;
	posY = e.pageY - canv.offsetTop;
	gOsc.gain.value = 1;
	oscillator.frequency.value = posX + posY;
	showPos();
}
}

function touchMove(e)
{
	if(!e)
		var e = event;
	e.preventDefault();
	posX = e.targetTouches[0].pageX - canv.offsetLeft;
	posY = e.targetTouches[0].pageY - canv.offsetTop;
	gOsc.gain.value = 1;
	oscillator.frequency.value = posX + posY;
	showPos();
}


function showPos()
{
	// context.font = "24pt helvetica";
 //    context.textAlign = "center";

 //    context.textBaseline = "middle";

 //    context.fillStyle = "rgb(64,255,64)";

 //    var str = posX + ", " + posY;

 //    if (mouseIsDown)

 //        str += " down";

 //    if (!mouseIsDown)

 //        str += " up";

    // context.clearRect(0, 0, canv.width, canv.height);

    // context.beginPath();
    // context.arc(posX, posY, 5, 5, 2 * Math.PI);
    // context.fillStyle = '#FDD000';
    // context.fill();
}

})();
function Update(sig)
{
	switch(sig)
	{
	//sine
	case 0 :
	{
	document.getElementById("signal-text").innerHTML="Sine Wave";
	oscillator.type='sine';
	break;
	}
	//square
	case 1 :
	{
	document.getElementById("signal-text").innerHTML="Square Wave";
	oscillator.type='square';;
	break;
	}
	//sawtooth
	case 2 :
	{
	document.getElementById("signal-text").innerHTML="Sawtooth Wave";
	oscillator.type='sawtooth';;
	break;
	}
	//triangle
	case 3 :
	{
	document.getElementById("signal-text").innerHTML="Triangle Wave";
	oscillator.type='triangle';
	break;
	}
	default :
	{
	oscillator.type='sine';
	sig = 0;
	document.getElementById("signal-text").innerHTML="Sine Wave";
	}
	}
}