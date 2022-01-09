'use strict';

export default class PopUp {
  constructor() {
    this.popup = document.querySelector('.pop-up');
    this.popupM = document.querySelector('.pop-up_message');
    this.popupR = document.querySelector('.pop-up_refresh');
    this.popupR.addEventListener('click', () => {
      this.hide();
      this.onClick && this.onClick();
    });
  }
  setClickListener(onClick) {
    this.onClick = onClick;

  }
  showWithText(text){
    this.popupM.innerText = text;
    this.popup.classList.remove('hide');
  }
  hide() {
    this.popup.classList.add('hide');
  }
}