/* Question card display */

var questionLinks = document.getElementById('question-list').children;
var questionCards = document.getElementsByClassName('question-card');
var objImage = document.getElementById("character");


/******************** CHARACTER MOVEMENT **************************/

function init() {
    objImage.style.position = 'absolute';
    objImage.style.left = '0px';
    objImage.style.top = '0px';
    objImage.style.height = '80px';
    objImage.style.width = 'auto';
}

function getKeyAndMove(e) {
    var key_code = e.which || e.keyCode;
    switch (key_code) {
        case 37: //left arrow key
            moveLeft();
            break;
        case 38: //Up arrow key
            moveUp();
            break;
        case 39: //right arrow key
            moveRight();
            break;
        case 40: //down arrow key
            moveDown();
            break;
    };
};

function moveLeft() {
    if(parseInt(objImage.style.left) > 0)
        objImage.style.left = parseInt(objImage.style.left) - 5 + 'px';
};

function moveUp() {
    if(parseInt(objImage.style.top) > 0)
        objImage.style.top = parseInt(objImage.style.top) - 5 + 'px';
};

function moveRight() {
    if(parseInt(objImage.style.left) < window.innerWidth - parseInt(objImage.style.height)/2)
        objImage.style.left = parseInt(objImage.style.left) + 5 + 'px';
};

function moveDown() {
    if(parseInt(objImage.style.top) < window.innerHeight - parseInt(objImage.style.height))
        objImage.style.top = parseInt(objImage.style.top) + 5 + 'px';
};

window.addEventListener('keydown', getKeyAndMove);
window.onload = init;