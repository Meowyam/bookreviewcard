console.log("hello");

function strokeStar(x, y, r, n, inset, ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (r*inset));
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

const c = document.getElementById("cardCanvas")
const ctx = c.getContext("2d")

function initCard(ctx) {
  ctx.beginPath()
  ctx.rect(0,0,540,540)
  ctx.fillStyle = '#f2e7a0'
  ctx.fill()
  ctx.rect(5,5,530,530)
  ctx.strokeStyle = '#214063'
  ctx.stroke()
  ctx.fillStyle = '#1c2024'
  ctx.font = '30px Playfair Display SC'
  ctx.textAlign = 'center'
  ctx.fillText('Library Card',267,50)
  ctx.strokeStyle = '#214063'

  ctx.beginPath()
  ctx.moveTo(5,77)
  ctx.lineTo(535,77)
  ctx.moveTo(5,80)
  ctx.lineTo(535,80)

  ctx.moveTo(5,140)
  ctx.lineTo(535,140)

  ctx.moveTo(5,200)
  ctx.lineTo(535,200)

  for (y=203; y < 530; y+=50) {
    ctx.moveTo(5, y)
    ctx.lineTo(535, y)
  }

  ctx.moveTo(150,203)
  ctx.lineTo(150,535)

  ctx.stroke()

  ctx.font = '12px Montserrat'
  ctx.textAlign = 'left'
  ctx.fillStyle = '#214063'
  ctx.fillText('AUTHOR',10,93)
  ctx.fillText('TITLE',10,153)
  ctx.fillText('DATES',55,216)
}
initCard(ctx)

function generateCard(cardInfo, ctx) {

  console.log(cardInfo)
  ctx.fillStyle = '#000'
  ctx.font = '30px Arial'
  ctx.fillText(cardInfo.title, 10, 50)
  ctx.fillText(cardInfo.author, 10, 100)
  ctx.fillText(cardInfo.genre1, 10, 200)
  ctx.fillText(cardInfo.genre2, 100, 200)
  let i = 0
  let x = 20
  if (i == 0) {
    ctx.fillText('', 10, 300)
  } else {
    do {
      i += 1
      x += 20
      strokeStar(x, 300, 3, 5, 3, ctx);
    } while (i<cardInfo.rating)
  }
}

function card() {
  return {
    title: '',
    author: '',
    genre1: '',
    genre2: '',
    rating: 0,
    startDate: '',
    endDate: '',
    isComplete: '',

    genres: [
      '',
      'Fantasy',
      'Scifi',
      'Horror',
      'Western',
      'Romance',
      'Thriller',
      'Mystery',
      'Detective',
      'Dystopian',
      'Adventure',
      'Young Adult',
      'Children',
      'Nonfiction',
      'Food',
      'Paranormal',
      'Historical',
      'Fairy tale',
      'Magical realism',
      'Mythology',
      'Classic',
      'Political',
      'Biography',
      'Memoir',
      'Self-help',
      'Reference',
      'Science',
      'Journalism',
      'Cooking',
      'Home decor',
      'Coffeetable',
      'Music',
      'Plants',
      'Animal',
      'Satire',
      'Comedy',
      'Literary',
      'Essays',
      'Short stories'
    ],

    stars: [
      '',
      'star',
      'star star',
      'star star star',
      'star star star star',
      'star star star star star'
    ],

    startDate: new Pikaday({
      field: document.getElementById('startDate')
    }),

    endDate: new Pikaday({
      field: document.getElementById('endDate')
    }),

    card: [
      {
        title: '',
        author: '',
        genre1: '',
        genre2: '',
        rating: 0,
        startDate: '',
        endDate: '',
        isComplete: '',
      }
    ],
    newCard() {
      card = {
        title: this.title,
        author: this.author,
        genre1: this.genre1,
        genre2: this.genre2,
        rating: this.rating,
        startDate: this.startDate,
        endDate: this.endDate,
        isComplete: this.isComplete,
      }
      generateCard(card, ctx)
    }
  }
}
