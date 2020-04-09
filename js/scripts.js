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
  this.tie = false;
}

Board.prototype.checkWinner = function () {
  let valuesArr = Object.values(this);
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
  } else if (!valuesArr.includes(null)) {
    this.over = true
    this.tie = true;
  } else {
    this.over = false
  }
}


//ui

function addResetListener() {
  $("#reset").click(function () {
    location.reload()
  })
}
function attachWrong(plop, wrong) {
  plop.pause()
  wrong.play()
  $('#message').html(`<h1 class="animated hinge red"> WRONG</h1>`);
}
function simpleAi(game) {
  let keys = ["tl", "tm", "tr", "mr", "mm", "ml", "bl", "bm", "br"]
  let AIKey = ''
  for (let i = 0; i >= 0; i++) {
    AIKey = keys[Math.floor(Math.random() * 9)];
    if (!game[AIKey]) {
      break;

    } else if (game.over) {
      break
    }
  }
  game[AIKey] = 'O'
  $(`#${AIKey}`).html(`<span class="animated rubberBand">O</span>`)
  console.log(AIKey);
  return AIKey;

}
function endGameDisplay(game, key, yodle, victory) {
  if (game.over || game.tie) {
    $("#board-container div").prop("disabled", true);
    if (game.tie) {
      yodle.play()
      setTimeout(() => { yodle.pause() }, 15500)
      $("#message").html(`<h1 class="animated flipInX blue">It's a tie try again</h1>`)
    } else {
      victory.play()
      $("#message").html(`<h1 class="animated flip green">${game[key]} is the Winner</h1>`)
    }
    setTimeout(() => {
      $("#mm").html(`<button id="reset" class="btn btn-success">Replay?</button>`)
      addResetListener()
    }, 3000);
  }
}

function addXorO(game, key, turn, twoplayer) {
  const plop = new Audio('https://freesound.org/data/previews/19/19987_37876-lq.mp3')
  const wrong = new Audio('https://freesound.org/data/previews/325/325443_4490625-lq.mp3')
  const victory = new Audio('https://www.myinstants.com/media/sounds/victory_fanfare.mp3')
  const yodle = new Audio(`https://www.redringtones.com/wp-content/uploads/2016/12/price-is-right-mountain-climber.mp3`)
  if (!game[key]) {
    plop.play()
    if (twoplayer) {
      if (turn % 2 === 0) {
        game[key] = 'O'
        $(`#${key}`).html(`<span class="animated rubberBand">O</span>`)
      } else {
        game[key] = 'X'
        $(`#${key}`).html(`<span class="animated rubberBand">X</span>`)
      }
    } else {

      game[key] = 'X'
      $(`#${key}`).html(`<span class="animated rubberBand">X</span>`)
      game.checkWinner();
      endGameDisplay(game, key, yodle, victory)//
      if (!game.over) {
        setTimeout(() => {
          plop.play();
          key = simpleAi(game);
          game.checkWinner();
          endGameDisplay(game, key, yodle, victory)
        }, 500);
      }
    }
    game.checkWinner();
    endGameDisplay(game, key, yodle, victory)

  } else {
    attachWrong(plop, wrong)
  }
}

$(document).ready(() => {
  let game = new Board()
  let turn = 1;
  let twoplayer = false
  $('#mode').click(function () {
    twoplayer = !twoplayer
    $("label").toggleClass('single-player')
    $("label").toggleClass('twoplayer')
    $("label").toggleClass('animated')
    $("label").toggleClass('animated')
    $("label").toggleClass('bounce')
    $("label").toggleClass('swing')
    $("label").removeClass('delay-4s')
    $("label").toggleClass('delay-1s')
    $("label").toggleClass('delay-1s')
    if (twoplayer) {
      $("label").text('Two Player')
    } else {
      $("label").text('Single Player')
    }
  })
  $('#board-container').on('click', 'div', event => {
    let key = event.target.id
    addXorO(game, key, turn, twoplayer)
    turn++
  })
})


