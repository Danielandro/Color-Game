var colors = []
var squares = document.querySelectorAll('.square'); // select all squares
var pickedColor; // right answer - random color to match
var displayColor = document.getElementById('displayColor'); // picked color in text
var message = document.getElementById('message'); // "Try Again" or "Correct!"
var resetButton = document.getElementById('reset');
var difficulty = 6; // number of squares
var h1 = document.querySelector('h1');
var modes = document.querySelectorAll('.mode');

setDifficulty(); // adds event listener to mode buttons
reset();
setupSquares();
resetButton.addEventListener('click', reset);

function setDifficulty(){
    for(var i = 0; i < modes.length; i++){
        // ADD CLICK LISTENER TO EASY/HARD BUTTONS
        modes[i].addEventListener('click', function(){
            // REMOVE SELECTED CLASS FROM BOTH BUTTONS
            modes[0].classList.remove('selected');
            modes[1].classList.remove('selected');
            // ADD CLASS TO CLICKED BUTTON
            this.classList.add('selected');
            // IF EASY CLICKED, SET NUM OF BOXES TO 3. ELSE, ITS 6.
            this.textContent === 'EASY' ? difficulty = 3 : difficulty = 6;
            // RESET BOXES FOR SELECTED DIFFICULTY
            reset();
        })
    }
}

// RESET COLOR OF SQUARES, PICKED COLOR & TEXT ON PAGE
function reset(){
    colors = arrayOfColors(difficulty)
    for (var i = 0; i < squares.length; i++) {
        // apply a color to each square
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i]; // set color of square 
            squares[i].style.display = 'block'; // if display = none, make square visible
        }else{
            squares[i].style.display = 'none'; // hide square
        }
    }
    message.innerText = ''; // clear message
    resetButton.textContent = 'New Colours';
    pickedColor = pickColor();    
    displayColor.textContent = pickedColor;
    h1.style.background = 'steelblue';
    
}

// PICK COLOR TO BE MATCHED - NEED TO RUN ON PAGE LOAD
function pickColor(){
    return colors[Math.floor(Math.random() * colors.length)];
}

// SETUP SQUARES, CHANGE THEIR COLOURS - NEED TO RUN ON PAGE LOAD
function setupSquares(){
    
    for (var i = 0; i < squares.length; i++) {
        // apply a color to each square
        squares[i].style.backgroundColor = colors[i];

        // add click listener for each square
        squares[i].addEventListener('click', function () {
            var clickedColor = this.style.backgroundColor;

            // check if color of clicked square matches right answer
            if (clickedColor === pickedColor) { // MATCH
                message.innerText = 'Correct!';                
                squares.forEach(function (square) {
                    square.style.backgroundColor = pickedColor; // change color of all squares
                })
                resetButton.innerText = 'PLAY AGAIN?';
                h1.style.background = pickedColor;

            } else { // NO MATCH
                message.innerText = 'Try Again';
                this.style.backgroundColor = '#232323';
            }
        });

    }
}

// GENERATES & RETURNS A RANDOM RGB COLOR
function generateRandomColors(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")"; // random rgb color
}

// CREATE ARRAY OF RANDOM COLORS TO APPLY TO SQUARES
function arrayOfColors(num){
    var arr = [];
    for(var i = 0; i < num; i++){        
        arr.push(generateRandomColors());
    }
    return arr;
}