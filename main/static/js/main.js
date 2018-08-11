"use strict";

// var questionLinks = document.getElementById('question-list').children;
var questionCards = $('.question-card');
var objImage = document.getElementById("character");
var imgDiv = document.getElementsByClassName("img-container")[0];
var road = $(".road");
var playerPosition; // Global variable to store player location
var obstacleList = $(".obstacle");
var submitBtn = $('.submit');
var rings = $('.ring');
var inQuestion = false;
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

    // console.log(e);
    // e.preventDefault();

    switch (key_code) {
        case 65: //left arrow key
            // e.preventDefault();
            if(!inQuestion)
                moveLeft();
            break;
        case 87: //Up arrow key
            // e.preventDefault();
            if(!inQuestion)
                moveUp();
            break;
        case 68: //right arrow key
            // e.preventDefault();
            if(!inQuestion)
                moveRight();
            break;
        case 83: //down arrow key
            // e.preventDefault();
            if(!inQuestion)
                moveDown();
            break;
        case 32:
            // hasEncountered(objImage.getBoundingClientRect(), obstacleList);
            // e.preventDefault();
            if( !inQuestion ) {
                hasEncountered2(objImage.getBoundingClientRect(), obstacleList);
                hasEncounteredRing(objImage.getBoundingClientRect(), rings);
            }   
            break;
        case 13:
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
    // if(parseInt(objImage.style.left) > 0)
        objImage.style.left = parseInt(objImage.style.left) - 5 + 'px';
};

function moveUp() {
    // if(parseInt(objImage.style.top) > 0)
        objImage.style.top = parseInt(objImage.style.top) - 5 + 'px';
};

function moveRight() {
    // if(parseInt(objImage.style.left) < window.innerWidth - parseInt(objImage.style.height)/2)
        objImage.style.left = parseInt(objImage.style.left) + 5 + 'px';
};

function moveDown() {
    // if(parseInt(objImage.style.top) < window.innerHeight - parseInt(objImage.style.height))
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
        var idno = obstacle.id.split('')[2] - 1;
        if(!ansBool[idno]) {
            if( !flag) {
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
                    inQuestion = true;
                    // $('#myModal' + str[2]).modal({
                    //     backdrop: 'static',
                    //     keyboard: false
                    // });
                    document.getElementById('ans'+str[2]).value = '';
                    // console.log("encountered");
                    flag = 1;
                    return 1;
                };
                // console.log(playerPosition, obstaclePosition);
                // console.log("not-encountered");
                return 0;
            }
        }
        else {
            return;
        }
    })
};

function resetPosition() {
    // console.log('clicked');
    objImage.style.left = '130px';
    objImage.style.top = '0px';
};


function hasEncounteredRing(playerPosition, rings) {
    var flag = 0;
    Array.from(rings).map( function(ring) {
        if(!flag) {
            var ringPosition = ring.getBoundingClientRect();
            if(
                ( Math.abs(playerPosition.left-ringPosition.left) < 50 ||
                Math.abs(playerPosition.right-ringPosition.right) < 50 ) &&
                (Math.abs(playerPosition.top-ringPosition.top) < 50 ||
                Math.abs(playerPosition.bottom-ringPosition.bottom) < 50) 
            ) {
                // console.log(ring.id);
                // var str = ring.id.split('');
                updateScore(100);
                var indRing = document.getElementById(ring.id);
                // indRing.className += " disapperRing";
                indRing.style.visibility = 'hidden';
                indRing.style.opacity = 0;
                // setTimeout( function() {
                //     indRing.style.display = 'none';
                // },1000);
                indRing.style.display = 'none';
                // console.log(str);
                // console.log("encountered");
                flag = 1;
                return 1;
            };
            // console.log(playerPosition, ringPosition);
            // console.log("not-encountered");
            return 0;
        }
    })

};

function checkAndUpdateRing() {
    // if player has solved certain number of questions unlock the rings
    ansBool.map( function(solved, index) {
        if(solved) {
            // console.log(index, solved);
            var id = index+1;
           document.getElementById('ring'+id).style.display = 'block';
        }
    })
};


function disableQuestion(idno) {
    // console.log(idno);
    var question = document.getElementById('ob'+idno);
    question.style.display = 'none';
}



/******************** PLAYER SCORES,ETC *******************/


var answers = ["1","2","3","4"];
window.onload = $.get( '/send_answer', function( data ) {
    data = JSON.parse(data);
    answers = data;
    // console.log(answers);
});
var  score = 0;
var scores = [10,20,30,40];
var ansBool = [0,0,0,0];
/*** Get answers from backend ***/

function updateScore(addScore) {
    score += addScore;
    var scoreboard = document.getElementById('playerScore');
    scoreboard.innerHTML = 'Score: ' + score;
    
    // POST Score after every correct answer
    // $.post {
    //     (/*url*/, {
    //         score: score
    //     }, 
    //     function(data,status){
    //         console.log(data, status);
    //     });
    // };
    return;
};

function validateAnswer(idno, answer) {
    // console.log(answers[idno-1], answer);
    if( answers[idno-1] === answer) {
        alert('correct answer')
        updateScore(scores[idno-1]);
        ansBool[idno-1] = 1;
        // hide question or do something
        checkAndUpdateRing();
        disableQuestion(idno);
        return;
    }
    alert('Answer galat hai');
    return;
};

function submitHandle(idno) {
    var inputValue = document.getElementById('ans'+idno).value;
    // console.log(idno, inputValue);
    validateAnswer(idno, inputValue);
    $('#myModal' + idno).modal('hide');
    inQuestion = false;
};

function closeModal() {
    inQuestion = false;
}

Array.from(submitBtn).map( function(btn){
    // console.log(btn);
    var idno = btn.id.split('')[3];
    btn.onclick = () => {
        submitHandle(idno);
    }
});

window.addEventListener('keydown', getKeyAndMove);
window.onload = init;