let inputDir = {x: 0, y: 0};
const musicSound = new Audio('theme.mp3');
const foodSound = new Audio('food3.mp3');
const turnSound = new Audio('turn3.mp3');
const gameOverSound = new Audio('fail.mp3');
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let SnakeArray = [
    {x: 13, y: 15}
]
let food = {x: 10, y: 15};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // if you bump into yourself
    for (let i = 1; i < SnakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you bump into wall
    if(snake[0].x > 18 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0){
        return true;
    }
}

function gameEngine(){
    //part 1 updating snake variable
    if(isCollide(SnakeArray)){
        scoreBox.innerHTML = `Score: 0`;
        board.style.opacity = "0.6";
        gameOverSound.play();
        musicSound.pause();
        swal({
            title: "Game Over",
            icon: "warning",
            text: `Your Score is ${score}`,
            dangerMode: true,
          })
        inputDir = {x:0, y:0};
        SnakeArray = [{x:13, y:15}];
        // musicSound.play();
        score = 0;
        board.style.opacity = "1";
    }

    //if you have eaten the food,then regeneration of food will be
    if(SnakeArray[0].y === food.y && SnakeArray[0].x === food.x){
        foodSound.play();
        SnakeArray.unshift({x:SnakeArray[0].x + inputDir.x,y:SnakeArray[0].y + inputDir.y});
        let a = 2,b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
        speed += 0.5;
        score++;
        scoreBox.innerHTML = `Score: ${score}`;
        if(score>hiscoreval){
            hiscoreval = score
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = `Hi-Score: ${hiscoreval}`;
        }
    }

    //Moving the snake
    for(let i = SnakeArray.length-2;i>=0;i--){ 
        SnakeArray[i+1] = {...SnakeArray[i]};
    }

    SnakeArray[0].x += inputDir.x;
    SnakeArray[0].y += inputDir.y;


    //part 2 displaying the snake
    board.innerHTML = "";
    SnakeArray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.append(snakeElement);
    });

    //displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.append(foodElement);
}

//main logic start here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = `Hi-Score: ${hiscore}`;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir = {x:0, y:1};         //start the game
    switch (e.key) {
        case "ArrowUp":
            // inputDir.x = 0;
            // inputDir.y = -1;
            inputDir = {x:0, y:-1};
            turnSound.play();
            break;
        case "ArrowDown":
            inputDir = {x:0, y:1};
            // inputDir.x = 0;
            // inputDir.y = 1;
            turnSound.play();
            break;
        case "ArrowRight":
            inputDir = {x:1, y:0};
            // inputDir.x = 1;
            // inputDir.y = 0;
            turnSound.play();
            break;
        case "ArrowLeft":
            inputDir = {x:-1, y:0};
            // inputDir.x = -1;
            // inputDir.y = 0;
            turnSound.play();
        
            break;
        default:
            break;
    }
})