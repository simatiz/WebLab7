let x1 = 0;
let x2 = 0;
let y1 = 0;
let y2 = 0;
let dx1 = -1 * getRandomInt(30);
let dy1 = getRandomInt(30);
let l = getRandomInt(10);
let dx2 = dx1 + l;
let dy2 = dy1 - l;
let ball_radius = 10;
let interval;

function show(state) {
    document.getElementById('work').style.display = state;
    document.getElementById('wrap').style.display = state;

    let canvas = document.getElementById('anim');
    let width = canvas.offsetWidth;
    clearInterval(interval);

    if(!document.querySelector('.button-start')){
        let button_reload = document.querySelector(".button-reload");
        let start_button = document.createElement('button');
        start_button.className = 'button-start';
        start_button.onclick = function() { start() };
        start_button.innerText = "Start";
        button_reload.replaceWith(start_button);
    }

    document.querySelector(".button-start").disabled = false;

    x1 = getRandomInt(width - 30) + ball_radius + 1;
    x2 = getRandomInt(width - 30) + ball_radius + 1;
    y1 = ball_radius + 1;
    y2 = canvas.offsetHeight - 18 - ball_radius;
    draw();

    let work_text = document.getElementById('work-text');
    work_text.innerHTML = '';
}

function start() {
    let work_text = document.getElementById('work-text');
    work_text.innerHTML = 'Animation started';
    document.querySelector(".button-start").disabled = true;

    interval = setInterval(drawFrame, 20);
}

function reload() {
    let work_text = document.getElementById('work-text');
    work_text.innerHTML = 'Animation reloaded';
    clearInterval(interval);

    let canvas = document.getElementById('anim');
    let width = canvas.offsetWidth;
    x1 = getRandomInt(width - 30) + ball_radius + 1;
    x2 = getRandomInt(width - 30) + ball_radius + 1;
    y1 = ball_radius + 1;
    y2 = canvas.offsetHeight - 20 - ball_radius;
    draw();

    let button_reload = document.querySelector(".button-reload");
    let start_button = document.createElement('button');
    start_button.className = 'button-start';
    start_button.onclick = function() { start() };
    start_button.innerText = "Start";
    button_reload.replaceWith(start_button);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function draw() {
    let canvas = document.getElementById('anim');
    let work = document.getElementById('work');
    canvas.width = work.offsetWidth - 20;
    canvas.height = work.offsetHeight - 60;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, ctx.offsetWidth, ctx.offsetHeight);

    ctx.beginPath();
    let startAngle = 0;
    let endAngle = 2*Math.PI;
    ctx.fillStyle = 'darkblue';
    ctx.strokeStyle = 'black';
    ctx.arc(x1, y1, ball_radius, startAngle, endAngle, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'darkorange';
    ctx.strokeStyle = 'black';
    ctx.arc(x2, y2, ball_radius, startAngle, endAngle, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawFrame() {
    let canvas = document.getElementById('anim');
    let ctx = canvas.getContext('2d');
    let work_text = document.getElementById('work-text');

    if((y1 - ball_radius > canvas.height / 2 && y2 - ball_radius > canvas.height / 2) ||
        (y1 + ball_radius < canvas.height / 2 && y2 + ball_radius < canvas.height / 2)){
        let start_button = document.querySelector(".button-start");
        work_text.innerHTML = 'One Half';
        let button_reload = document.createElement('button');
        button_reload.className = 'button-reload';
        button_reload.onclick = function() { reload() };
        button_reload.innerText = "Reload";
        start_button.replaceWith(button_reload);
    }

    if(x1 + dx1 > canvas.width - ball_radius || x1 + dx1 < ball_radius) {
        dx1 = -dx1;
        work_text.innerHTML = 'Blue ball hit wall';
    }

    if(y1 + dy1 > canvas.height - ball_radius || y1 + dy1 < ball_radius) {
        dy1 = -dy1;
        work_text.innerHTML = 'Blue ball hit wall';
    }

    if(x2 + dx2 > canvas.width - ball_radius || x2 + dx2 < ball_radius) {
        dx2 = -dx2;
        work_text.innerHTML = 'Orange ball hit wall';
    }

    if(y2 + dy2 > canvas.height - ball_radius || y2 + dy2 < ball_radius) {
        dy2 = -dy2;
        work_text.innerHTML = 'Orange ball hit wall';
    }

    if(x1 + dx1 >= x2 - ball_radius && x1 + dx1 <= x2 + ball_radius &&
        y1 + dy1 >= y2 - ball_radius && y1 + dy1 <= y2 + ball_radius) {
        dx1 = -dx1;
        dy1 = -dy1;
        dx2 = -dx2;
        dy2 = -dy2;
        work_text.innerHTML = 'Balls hit each other';
    }

    x1 += dx1;
    y1 += dy1;
    x2 += dx2;
    y2 += dy2;
    draw();
}