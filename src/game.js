'use strict'
import {Field, ItemType} from './field.js';
import * as sound from './sound.js';
//Builder Pattern
export class GameBuilder{
  gameDuration(duration){
    this.gameDuration = duration;
    return this;
  }

  carrotCount(num){
    this.carrotCount = num;
    return this;
  }

  bugCount(num){
    this.bugCount = num;
    return this;
  }

  build(){
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    );
  }
}

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

class Game{
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.carrotCount_level = carrotCount;
    this.bugCount_level = bugCount;
    this.gameField = new Field(this.carrotCount_level, this.bugCount_level)
    this.gameField.setClickListener(this.onItemClick);
    
//    this.gameField = new Field(this.carrotCount_level, this.bugCount_level)
//    this.gameField.setClickListener(this.onItemClick);
    this.gameTimer = document.querySelector('.timer');
    this.gameScore = document.querySelector('.left_carrot');
    this.level_HTML = document.querySelector('.level');
    this.play = document.querySelector('.play');
    this.play.addEventListener('click', () =>{
      if(this.started){
        this.stop(Reason.cancel);
      }
      else{
        this.start();
      }
    });

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop){
    this.onGameStop=onGameStop;
  }

  start() {
    this.started=true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBG();
    this.levelDP()
  }
  stop(reason) {
    this.started=false;
    this.hideStartBtn();
    this.stopGameTimer();
    sound.stopBG();
    if (reason === Reason.win) {
      sound.playWin();
    } else if (reason === Reason.lose) {
      sound.playBug();
    }
    this.onGameStop && this.onGameStop(reason);
  }

  initGame(){
    this.score = 0;
    this.updateScoreBoard(this.score);
    this.gameField = new Field(this.carrotCount_level, this.bugCount_level)
    this.gameField.init();
  }
  
  onItemClick = (item) =>{
    if (!this.started){
      return;
    }
    if (item === ItemType.carrot){
      this.score++;
      this.updateScoreBoard();
      console.log(this.score);
      if(this.score === this.carrotCount_level){
        this.stop(Reason.win);
      }
    }
    else if(item === ItemType.bug){
      this.stop(Reason.lose);
    }
  }
  startGameTimer(){
    let time = this.gameDuration;
    let min = "";
    let sec = "";
    this.timer = setInterval(() => {
      min = parseInt(time/60);
      sec = time%60;
      const locar_timer = document.querySelector('.timer');
      locar_timer.innerHTML=`<span>${min} : ${sec} </span>`;
      if (--time<0){
        clearInterval(this.timer);
        this.stop(Reason.lose);
        return;
      }
    }, 1000-(this.carrotCount_level-this.carrotCount)*30);  
  }

  stopGameTimer(){
    clearInterval(this.timer);
  }
  updateScoreBoard(){
    this.gameScore.innerText= this.carrotCount_level-this.score;
  }
  
  showStartButton() {
    const icon = this.gameBtn.querySelector('.fas');
    icon.classList.remove('fa-stop');
    this.gameBtn.style.visibility = 'visible';
  }
  showStopBtn(){
    const icon = this.play.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.play.style.visibility = 'visible';
  }
  hideStartBtn(){
    this.play.style.visibility = 'hidden';
  }
  showTimerAndScore(){
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }
  hideTimerAndScore(){
    this.gameTimer.style.visibility = 'hidden';
    this.gameScore.style.visibility = 'hidden';
  }
  levelDP(){
    this.level_HTML.innerText= `Level ${this.carrotCount_level-this.carrotCount+1}`;
  }
/////////이거 그거임
  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerHTML = `${minutes}:${seconds}`;
  }
  resetScoreText() {
    this.scoreText.innerText = this.carrotCount;
  }
}

