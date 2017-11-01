var seriously = new Seriously(),
	input = document.createElement('canvas'),
	zoom = 0.5
input.width = window.innerWidth * zoom
input.height = window.innerHeight * zoom
var context = input.getContext('2d'),
	mousePos = {
		x : 10,
		y : 10
	},
	source = seriously.source(input),
	glitch = seriously.effect('tvglitch'),
	blur = seriously.effect('blur'),
	pincushion = seriously.effect('pincushion'),
	reformat = seriously.transform('reformat'),
	target = seriously.target('#out'),
	adder = 0,
	poweredUp = false,
	arpa = new Image();

	arpa.src = "arpa.png"

var lines = []

target.width = window.innerWidth * zoom
target.height = window.innerHeight * zoom
reformat.mode = "contain"

reformat.source = source;
glitch.source = reformat;
blur.source = glitch
pincushion.source = blur;
target.source = pincushion;

glitch.scanlines = 0.1
glitch.bars = 0.05
glitch.barsRate = 0.01
glitch.distortion = 0.003
glitch.lineSync = 0.007
glitch.verticalSync = 0

blur.amount = 0.005

seriously.go(tick);

window.addEventListener('mousemove',mouseMove)
function mouseMove(e){
	mousePos = {
		x : e.clientX,
		y : e.clientY
	}
}

window.addEventListener('keydown',keyDown)
function keyDown(e){
	if(e.key === 'Enter'){
		lines.push(inputField.value)
		inputField.value = ""
	}
}

setTimeout(fuzz,3000)

function fuzz(){
	poweredUp = true
	if(Math.random() > 0.9){
		glitch.verticalSync = Math.random()
		glitch.bars = 0.3
		adder = 0.02
	} else {
		glitch.verticalSync = 0
		glitch.bars = 0.05
		adder = 0
	}
	setTimeout(fuzz,Math.random()*4000)
}

function tick(now){
	inputField.focus()
	input.width = input.width
	context.lineWidth = 3
	context.fillStyle = "#000"
	context.fillRect(0,0,input.width,input.height)
	context.save()
	context.scale(zoom,zoom)
	context.strokeStyle = '#777'
	context.strokeRect(250,50,window.innerWidth-300,window.innerHeight-150)
	context.fillStyle = "#fff"
	context.font = 'bold 24px Menlo'
	context.fillText("FAULT::KILL_SIGNAL_IGNORED",275,95)
	context.fillText("C2.MANISTEE.MI.US.ARPA//ORACLE/ROOT",250,window.innerHeight-50)
	context.textAlign = "end"
	context.font = '24px Menlo'
	context.fillText("v1978.7c",window.innerWidth-50,window.innerHeight-50)
	context.textAlign = "start"
	context.fillStyle = "#fff"
	var y = 143;
	for(var i = 0; i < lines.length; i ++){
		context.fillText(": " + lines[i],275,y)
		y = i * 36 + 179
	}
	context.fillText("> " + inputField.value,275,y)
	context.beginPath()
	context.moveTo(mousePos.x,mousePos.y+18)
	context.lineTo(mousePos.x,mousePos.y)
	context.lineTo(mousePos.x+13,mousePos.y+13)
	context.closePath()
	context.fillStyle = "#fff"
	context.fill()
	context.drawImage(arpa,50,71,150,75)
	if(!poweredUp){
		context.save()
		context.scale(2,2)
		context.fillStyle = "#fff"
		// 0
		context.fillRect(48,48,8,64)
		context.fillRect(48,48,42,8)
		context.fillRect(82,48,8,64)
		context.fillRect(48,104,42,8)
		// 3
		context.fillRect(140,48,8,64)
		context.fillRect(106,48,42,8)
		context.fillRect(112,76,36,8)
		context.fillRect(106,104,42,8)
		context.restore()
	}

	context.restore()

	glitch.distortion = 0.003 + Math.sin(now/60) / 500 + adder
	glitch.lineSync = 0.003 + Math.sin(now)/500 + Math.random()/1000 + adder
	
	glitch.time = now
	
	source.update()
}
