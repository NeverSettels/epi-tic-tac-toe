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
}

Board.prototype.checkWinner = function () {

}


$(document).ready(() => {
  let game = new Board()
  let turn = 1;
  $('#board-container').on('click', 'div', event => {
    let key = event.target.id
    if (!game[key]) {
      if (turn % 2 === 0) {
        game[key] = 'O'
      } else {
        game[key] = 'X'
      }
      turn++
    } else {
      console.log('oops no valid');
    }
    console.log(game)
  })
})