'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;


export const ItemType = Object.freeze({
carrot: 'carrot',
bug:'bug',
})

export class Field{
  constructor(carrotCount, bugCount){
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.playground = document.querySelector('.playground');
    this.playground_Rect = this.playground.getBoundingClientRect();
    this.onFieldClick = this.onFieldClick.bind(this);
    this.playground.addEventListener('click', (event) => this.onFieldClick(event));
  }

  init() {
    this.playground.innerHTML ='';
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }


  _addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = this.playground_Rect.width - CARROT_SIZE;
    const y2 = this.playground_Rect.height - CARROT_SIZE;
    for(let i=0;i<count;i++){
        const item = document.createElement('img');
        item.setAttribute('class', className)
        item.setAttribute('src', imgPath)
        item.setAttribute('data-id', `id-${className}`);
        `id-${className}++`;
        item.style.position = 'absolute';
        const x = getRD(x1, x2);
        const y = getRD(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        this.playground.append(item);
    }
  }

  onFieldClick(event){
    const target = event.target;
    if(target.matches('.carrot')){
      sound.playCarrot();
      target.remove('');
      this.onItemClick && this.onItemClick(ItemType.carrot);
    }
    else if(target.matches('.bug')){
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

function getRD(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}