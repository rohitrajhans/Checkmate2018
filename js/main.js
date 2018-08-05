"use strict";

var questionLinks = document.getElementById('question-list').children;
var questionCards = document.getElementsByClassName('question-card');
var objImage = document.getElementById("character");
// var imgDiv = document.getElementsByClassName("img-container")[0];
var road = document.getElementsByClassName("road");
var playerPosition; // Global variable to store player location
var obstacleList = document.getElementsByClassName("obstacle");
var submitBtn = document.getElementsByClassName('submit');
/******************** CHARACTER MOVEMENT **************************/

function init() {
    objImage.style.position = 'absolute';
    objImage.style.left = '130px';
    objImage.style.top = '0px';
    objImage.style.height = '80px';
    objImage.style.width = 'auto';
}

function getKeyAndMove(e) {
    // console.log("t");
    // playerPosition = objImage.getBoundingClientRect();
    var key_code = e.which || e.keyCode;
    // console.log(e.keyCode);
    // Checks if character is within the road
    const shouldMove = isEnclosed(
        road, 
        objImage
    );

    // getBoundingClientRect returns value in px, so do not MESS UP.
    // If character is not within the road, then go back to last on road position
    if(!shouldMove) {
        objImage.style.left = playerPosition.left + 'px';
        objImage.style.top = playerPosition.top + 'px';
        return;
    };

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
        case 40: //down arrow key`
            moveDown();
            break;
        case 32:
            // hasEncountered(objImage.getBoundingClientRect(), obstacleList);
            hasEncountered2(objImage.getBoundingClientRect(), obstacleList);
            break;
    };

    // Save character on road position
    playerPosition = objImage.getBoundingClientRect();
    // console.log(playerPosition);
};

// function isEnclosed(roadList, player) {
//     const enc = Array.from(roadList)
//     .map(road => road.getBoundingClientRect())
//     .some(roadCoordinates => {
//         const {left, right, top, bottom} = roadCoordinates;
//         const {left: pLeft,
//             right: pRight, 
//             top: pTop, 
//             bottom: pBottom} = player.getBoundingClientRect(); 
//         // console.log(x, y, left, right, top, bottom);
//         return pLeft >= left
//         && pRight <= right
//         && pTop >= top
//         && pBottom <= bottom;
//     })
//     console.log(enc); 
//     return enc;
// }

function isEnclosed(roadList, player) {
    var enc = Array.from(roadList).map(function (road) {
        return road.getBoundingClientRect();
    }).some(function (roadCoordinates) {
        var left = roadCoordinates.left,
            right = roadCoordinates.right,
            top = roadCoordinates.top,
            bottom = roadCoordinates.bottom;

        var _player$getBoundingCl = player.getBoundingClientRect(),
            pLeft = _player$getBoundingCl.left,
            pRight = _player$getBoundingCl.right,
            pTop = _player$getBoundingCl.top,
            pBottom = _player$getBoundingCl.bottom;
            // console.log(pLeft, pTop, left, right, top, bottom);


        return pLeft >= left && pRight <= right && pTop >= top && pBottom <= bottom;
    });
    // console.log(enc);
    return enc;
}

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

// function hasEncountered( playerPosition, obstacleList ) {
//     var enc = Array.from(obstacleList).map(function(obstacle) {
//         // console.log(obstacle);
//         return obstacle.getBoundingClientRect();
//     }).some( function(obstaclePosition) {
//         if(
//             ((playerPosition.left + 30 === obstaclePosition.left) || (playerPosition.left - 30 === obstaclePosition.left)) ||
//             (playerPosition.right + 30 === obstaclePosition.right) || (playerPosition.right - 30 === obstaclePosition.right) ||
//             (playerPosition.top + 30 === obstaclePosition.top) || (playerPosition.top - 30 === obstaclePosition.top) ||
//             (playerPosition.bottom + 30 === obstaclePosition.bottom) || (playerPosition.bottom - 30 === obstaclePosition.bottom)
//         ) {
//             $('#myModal1').modal('show');
//             console.log("encountered");
//             return 1;
//         }
//         console.log("not-encountered");
//         return 0;
//     });
//     return enc;
// };

function hasEncountered2( playerPosition, obstacleList) {
    var flag = 0;
    // console.log(obstacleList);
    Array.from(obstacleList).map( function(obstacle) {
        if(!flag) {
            var obstaclePosition = obstacle.getBoundingClientRect();
            if(
                ( Math.abs(playerPosition.left-obstaclePosition.left) < 50 ||
                Math.abs(playerPosition.right-obstaclePosition.right) < 50 ) &&
                (Math.abs(playerPosition.top-obstaclePosition.top) < 50 ||
                Math.abs(playerPosition.bottom-obstaclePosition.bottom) < 50) 
            ) {
                // console.log(obstacle.id);
                var str = obstacle.id.split('');
                // console.log(str);
                $('#myModal' + str[2]).modal('show');
                // console.log("encountered");
                flag = 1;
                return 1;
            };
            // console.log(playerPosition, obstaclePosition);
            // console.log("not-encountered");
            return 0;
        }
    })
};

function resetPosition() {

};




/******************** PLAYER SCORES,ETC *******************/

// var  score = 0;
// var answers = [];
// /*** Get answers from backend ***/

// function updateScore() {

// };

// let check = async function validateAnswer(answer) {

//     var answers = await ;
//     return {
        
//     }
// };

// function submitHandle(idno, value) {
//     // console.log('clicked');
//     console.log(idno);
//     var bool = check(idno, answer);
// };

// Array.from(submitBtn).map( function(btn){
//     // console.log(btn);
//     var idno = btn.id.split('')[3];
//     btn.onclick = () => {
//         submitHandle(idno, value);
//     }
// });


window.addEventListener('keydown', getKeyAndMove);
window.onload = init;