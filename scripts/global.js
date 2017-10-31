var seriously = new Seriously(),
	input = document.createElement('canvas'),
	zoom = 0.5
input.width = window.innerWidth * zoom
input.height = window.innerHeight * zoom
var context = input.getContext('2d'),
	mousePos = {
		x : 0,
		y : 0
	},
	source = seriously.source(input),
	glitch = seriously.effect('tvglitch'),
	blur = seriously.effect('blur'),
	pincushion = seriously.effect('pincushion'),
	reformat = seriously.transform('reformat'),
	target = seriously.target('#out'),
	adder = 0,
	poweredUp = false,
	wSoft = new Image();

	wSoft.src = "wsoft.png"

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
		inputField.value = ""
	}
}

setTimeout(fuzz,3000)

function fuzz(){
	poweredUp = true
	if(Math.random() > 0.8){
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
	
	context.lineWidth = 3
	context.fillStyle = "#111"
	context.fillRect(0,0,input.width,input.height)
	context.save()
	context.scale(zoom,zoom)
	context.strokeStyle = '#777'
	context.fillStyle = "#333"
	context.fillRect(16,16,window.innerWidth-32,window.innerHeight-32)
	context.fillStyle = "#111"
	context.fillRect(100,150,window.innerWidth-200,window.innerHeight-300)
	context.strokeRect(100,150,window.innerWidth-200,window.innerHeight-300)
	context.fillStyle = "#fff"
	context.font = 'bold 24px Menlo'
	context.fillText("FAULT::INTERRUPT.CURRENT_EXCEEDS_TOLERANCE",135,200)
	context.font = '24px Menlo'
	context.fillStyle = "#fff"
	context.fillText("> " + inputField.value,135,250)
	context.beginPath()
	context.moveTo(mousePos.x,mousePos.y+18)
	context.lineTo(mousePos.x,mousePos.y)
	context.lineTo(mousePos.x+13,mousePos.y+13)
	context.closePath()
	context.fillStyle = "#fff"
	context.fill()
	context.drawImage(wSoft,100,52,128,66)
	if(!poweredUp){
		context.save()
		context.scale(2,2)
		context.fillStyle = "#0f0"
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
