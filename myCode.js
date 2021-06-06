var displaybegin = "";
var display;
var wordCat;
var word = "";
var count = 0;
var correctGuess = 0;
var incorrectGuess = 0;
var picCount = 1;
var pictures = ["begin.jpg","head.jpg","body.jpg","One leg.jpg","Two legs.jpg","one arm.jpg","Dead.jpg"];
var win = 0;
var lose = 0;
var cat = "";
var guess;
function numPlayers(players){
    // alert("Choose a level to begin");
    if(players == 2){
        var name1 = prompt("Player 1: What is your name?");
        var name2 = prompt("Player 2: What is your name?");
        word = prompt(name1 + ": What word would you like to choose?");
        displayWord();
    }else{
        document.getElementById("button1").disabled = false;
        document.getElementById("button2").disabled = false;
        document.getElementById("button3").disabled = false;
    }
    document.getElementById("buttonp1").disabled = true;
    document.getElementById("buttonp2").disabled = true;
    
}

function direction(){
    document.getElementById("howTo1").innerHTML = "1. Choose the number of players. if, you are playing one player:Chooose a level.";
    document.getElementById("howTo2").innerHTML = "2. Click on guess a letter, and guess letter, that you think is in the word. If it is wrong, then a picture will show up. If it is right, then click to guess again."
    document.getElementById("howTo3").innerHTML = "3.Keep playing until you have guessed the whole wrod or you have drawn a hangman!";
}
function easy(){
    document.getElementById("play").disabled = false;
    wordCat = Math.floor(Math.random()*(5-1))+ 1;
    pickWord();
}
function medium(){
    document.getElementById("play").disabled = false;
    wordCat = Math.floor(Math.random()*(10-6))+ 6;
    pickWord();
}
function hard() {
    document.getElementById("play").disabled = false;
    wordCat= Math.floor(Math.random()*(15-11))+11;
    pickWord();
}
function reset(){
    document.getElementById("button1").disabled = true;
    document.getElementById("button2").disabled = true;
    document.getElementById("button3").disabled = true;
    document.getElementById("buttonp1").disabled = false;
    document.getElementById("buttonp2").disabled = false;
    document.getElementById("image").src = "Pictures/begin.jpg";
    uL = "";
    document.getElementById("letters").innerHTML ="Used letters are: " +uL;
    displaybegin = "";
    document.getElementById("display").innerHTML = displaybegin;
    display = "";
    document.getElementById("displayword").innerHTML = "";
    cat = "";
    document.getElementById("categories").innerHTML = cat;
    alert("Choose a number of players")
}
function pickWord() {
    document.getElementById("button1").disabled = true;
    document.getElementById("button2").disabled = true;
    document.getElementById("button3").disabled = true;
    var CatChoose = Math.floor(Math.random()*2);
    //document.getElementById("levelDisp").innerHTML = "The level is:" + level;
    document.getElementById("image").src = "Pictures/begin.jpg";
//alert(CatChoose);
    if(CatChoose == 0){
        var animals = ["dog","cat","fish","duck","bear","tiger","camel","badger","beagle","buffalo","elephant","alligator", "dolphin","penguin","chicken"];
        //Category 1 + words
        word = (animals[wordCat]);
        cat = "animals"
    }else if(CatChoose == 1){
        var colors = ["red","blue","green","pink","gray","maroon","purple","black","yellow","orange","avacado","beige","blackberry","bronze","chartreuse"];
        word = (colors[wordCat]);
        cat = "colors";
        //Category 2 + word
    }else if(CatChoose == 2){
        var fruitsVeggies = ["kiwi","lettuce","plum","cherry","peach","nectarine","tomato","peppers","cucumber","squash","strawberry","zucchini","blueberry","pumpkin","habanero"];
        word = (fruitsVeggies[wordCat]);
        cat = "fruits and veggies";
        //Category 3 + words
    }
    alert(word);
    displayWord();
}

function displayWord(){
    for(i=0;i<word.length;i++){
        displaybegin = displaybegin + " " + "_";
    }
    document.getElementById("play").disabled = false;
    document.getElementById("display").innerHTML= displaybegin;
    document.getElementById("categories").innerHTML= "The category is: " + cat;
    document.getElementById("button").disabled = false;
}
var uL = "";
function guessCheck() {
    //This function is used to convert/check to see if each guessed letter is lowercase, because that is how my code works.
    //document.getElementById("level").disabled = true;
    display = "";
    guess = prompt("guess a letter");
    guess= guess.toLowerCase();
    var match = "";
    var letChoices=[];
    for (i = 97;i<122;i++){
        letChoices.push(String.fromCharCode(i));
    }
    var found = false;
    for (i = 0; i<letChoices.length;i++){
        if (letChoices[i] == guess){
            found = true;
        }
    }
    if (found ==false){
        alert("Try Again");
        guess = prompt("guess a letter");
        guess = guess.toLowerCase();
        // If the guessed letter is not lowercase then it allows the user to try again
    }
    findLetter();
}//function
function findLetter(){
    uL = uL + guess;
    for (k = 0; k < word.length; k++) {
        match = false;
        var temp = "";

        for (i = 0; i < uL.length; i++) {
            if (uL.substring(i, i + 1) == word.substring(k, k + 1)) {
                match = true;
                temp = uL.substring(i, i + 1);
            }
        }//inside loop
        if (match == true) {
            display = display + " " + temp;
        } else {
            display = display + " " + "_";
        }
    }//outside loop
    //This function is checking to see if the letter is found in the word or not
    check();
}
function check(){
    count =0;
    for (k = 0; k < word.length; k++) {
        if (guess == word.substring(k, k + 1)) {
            count = count + 1;
            correctGuess = correctGuess + 1;
        }
    }
    if (count == 0) {
        incorrectGuess = incorrectGuess + 1;
        document.getElementById("displayword").innerHTML ="Try Again!";
        document.getElementById("image").src = "Pictures/" + pictures[picCount];
        picCount = picCount +1;
    } else {
        if (correctGuess == word.length){
            document.getElementById("displayword").innerHTML ="You Win!";
            win = win + 1;
            correctGuess = 0;
            incorrectGuess = 0;
           document.getElementById("start").disabled = false;
           document.getElementById("play").disabled = true;
        }
    }
    document.getElementById("win").innerHTML = "Games Won are: " + win;
    document.getElementById("triescorrect").innerHTML = "The number of correct guesses are: " + correctGuess;
    //document.getElementById("triesincorrect").innerHTML = "The number of incorrect guesses are: " + incorrectGuess;

    if(incorrectGuess == 6){
        word = "You Lose! The correct word was " + word;
        document.getElementById("displayword").innerHTML =word;
        lose = lose + 1;
        document.getElementById("start").disabled = false;
        document.getElementById("play").disabled = true;
    }
    document.getElementById("lose").innerHTML ="Games Lost are: " + lose;
    document.getElementById("display").innerHTML = display;
    document.getElementById("letters").innerHTML = "Used letters are: " + uL;
    // This function either adds to correct or incorect. if incorrect it will display the right picture.
}