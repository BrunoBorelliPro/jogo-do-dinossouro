let score = 0


const player = document.querySelector(".player")
const background = document.querySelector(".background")
let verticalVelocity = 18;
let horizontalVelocity = 10;
let isJumping = false;
let position = 0;

function gerarPaginadeErro(score){
    const game_over_page = 
        `<div class="game-over-page">
        <h1 class="game-over">Fim de jogo</h1>
        <button><img src="./img/update-arrow.svg" alt="" onclick={reiniciar()}></button>
        <h2>Score:${score}</h2>
        </div>`
    return game_over_page
}

function atualizaScore(score){
    scoreView = document.querySelector(".score")
    scoreView.innerHTML = 
    `<div class="score">
        <h1>Score:${score}</h1>
    </div>`
}

function reiniciar(){
    window.document.location.reload()
    return false
}

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            pular()
        }
    }
}
function pular(){
    isJumping = true
    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval)
            let downInterval = setInterval(() => {
            if(position <= 0){
                clearInterval(downInterval)
                isJumping = false
            }else{
                position -= verticalVelocity;
                player.style.bottom = position + "px"
            }
            }, 20);
        }else{
            position += verticalVelocity;
            player.style.bottom = position + "px"
        }
        
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randowTime = Math.floor(Math.random()*5000) + 1000
    cactus.classList.add('cactus')
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus)

    let leftInterval = setInterval(() => {
        cactusPosition -= horizontalVelocity
        cactus.style.left = cactusPosition + "px" 
        if(cactusPosition < -60){
            clearInterval(leftInterval)
            background.removeChild(cactus)
            score++
            atualizaScore(score)
        }else if(cactusPosition>0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval)
            document.body.innerHTML = gerarPaginadeErro(score)
        }
    }, 20);
    setTimeout(createCactus, randowTime);
}

createCactus()
document.addEventListener('keydown',handleKeyUp)