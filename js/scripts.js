function Board() {
  this.tl = null;
  this.tm = null;
  this.tr = null;
  this.ml = null;
  this.mm = null;
  this.mr = null;
  this.bl = null;
  this.bm = null;
  this.br = null;
  this.over = false;
}

Board.prototype.checkWinner = function () {
  if (this.tl && this.tl === this.tm && this.tm === this.tr) {
    console.log(`${this.tl} winns!`);
    this.over = true
  } else if (this.ml && this.ml === this.mm && this.mm === this.mr) {
    console.log(`${this.ml} winns!`);
    this.over = true
  } else if (this.bl && this.bl === this.bm && this.bm === this.br) {
    console.log(`${this.bl} winns!`);
    this.over = true
  } else if (this.tl && this.tl === this.ml && this.ml === this.bl) {
    console.log(`${this.tl} winns!`);
    this.over = true
  } else if (this.tr && this.tr === this.mr && this.mr === this.br) {
    console.log(`${this.tr} winns!`);
    this.over = true
  } else if (this.tm && this.tm === this.mm && this.mm === this.bm) {
    console.log(`${this.tm} winns!`);
    this.over = true
  } else if (this.tl && this.tl === this.mm && this.mm === this.br) {
    console.log(`${this.tl} winns!`);
    this.over = true
  } else if (this.tr && this.tr === this.mm && this.mm === this.bl) {
    console.log(`${this.tr} winns!`);
    this.over = true
  } else {
    this.over = false
  }
}


$(document).ready(() => {
  let game = new Board()
  let turn = 1;
  const plop = new Audio('https://freesound.org/data/previews/19/19987_37876-lq.mp3')
  console.log(null == null)
  $('#board-container').on('click', 'div', event => {
    let key = event.target.id
    if (!game[key]) {
      plop.play()
      if (turn % 2 === 0) {
        game[key] = 'O'
        $(`#${key}`).html(`<span class="animated rubberBand">O</span>`)
      } else {
        game[key] = 'X'
        $(`#${key}`).html(`<span class="animated rubberBand">X</span>`)
      }
      game.checkWinner();
      if (game.over || turn >= 9) {
        $("#board-container div").prop("disabled", true);
        if (!game.over) {
          console.log('its a tie');
        }
      }
      turn++
    } else {
      console.log('oops no valid');
    }
    console.log(game)
  })
})


