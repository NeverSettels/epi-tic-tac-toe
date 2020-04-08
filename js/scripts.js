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
    this.over = true
  } else if (this.ml && this.ml === this.mm && this.mm === this.mr) {
    this.over = true
  } else if (this.bl && this.bl === this.bm && this.bm === this.br) {
    this.over = true
  } else if (this.tl && this.tl === this.ml && this.ml === this.bl) {
    this.over = true
  } else if (this.tr && this.tr === this.mr && this.mr === this.br) {
    this.over = true
  } else if (this.tm && this.tm === this.mm && this.mm === this.bm) {
    this.over = true
  } else if (this.tl && this.tl === this.mm && this.mm === this.br) {
    this.over = true
  } else if (this.tr && this.tr === this.mm && this.mm === this.bl) {
    this.over = true
  } else {
    this.over = false
  }
}

function addListener() {
  $("#reset").click(function () {
    console.log("reset")
    location.reload()
  })
}
function attachWrong(plop, wrong) {
  plop.pause()
  wrong.play()
  $('#message').html(`<h1 class="animated hinge red"> WRONG</h1>`);
}

$(document).ready(() => {
  let game = new Board()
  let turn = 1;
  const plop = new Audio('https://freesound.org/data/previews/19/19987_37876-lq.mp3')
  const wrong = new Audio('https://freesound.org/data/previews/325/325443_4490625-lq.mp3')
  const victory = new Audio('https://freesound.org/data/previews/249/249524_3906011-lq.mp3')
  const yodle = new Audio(`https://www.redringtones.com/wp-content/uploads/2016/12/price-is-right-mountain-climber.mp3`)
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
          yodle.play()
          setTimeout(() => { yodle.pause() }, 15500)
          $("#message").html(`<h1 class="animated flipInX blue">It's a tie both you suck</h1>`)
        } else {
          victory.play()
          $("#message").html(`<h1 class="animated flip green">${game[key]} is the Winner</h1>`)
        }
        setTimeout(() => {
          $("#mm").html(`<button id="reset" class="btn btn-success">Replay?</button>`)
          addListener()
        }, 2000);
      }
      turn++
    } else {
      attachWrong(plop, wrong)
    }
  })


})


