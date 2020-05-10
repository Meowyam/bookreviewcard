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


function generateCard(cardInfo) {

  console.log(cardInfo)

  const c = document.getElementById("cardCanvas")
  const ctx = c.getContext("2d")
  ctx.beginPath()
  ctx.rect(0,0,1080,1080)
  ctx.fillStyle = '#d7b666'
  ctx.fill()
  ctx.fillStyle = '#000'
  ctx.font = "30px Arial"
  ctx.fillText(cardInfo.title, 10, 50)
  ctx.fillText(cardInfo.author, 10, 100)
  ctx.fillText(cardInfo.genre1, 10, 200)
  ctx.fillText(cardInfo.genre2, 100, 200)
  let i = 0
  let x = 20
  if (i == 0) {
    ctx.fillText('No rating', 10, 300)
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
      generateCard(card)
    }
  }
}
