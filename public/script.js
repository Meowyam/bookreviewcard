function loadCard() {
  if (sessionStorage.length == 0) {
    return {
      title: '',
      author: '',
      genre1: '',
      genre2: '',
      rating: 0,
      startDate: '',
      endDate: '',
      isComplete: '',
      sentence: '',
    }
  } else {
    return JSON.parse(sessionStorage.getItem('card'))
  }
}
let cardData = loadCard()

const c = document.getElementById("cardCanvas")

const ctx = c.getContext("2d")

function getCardImage() {
  const reviewCard = c.toDataURL("image/png", 1.0)
  document.getElementById("download").setAttribute("href", reviewCard)
}

function initCard(ctx) {
  ctx.setTransform(1,0,0,1,0,0)
  ctx.clearRect(0,0,1080,1080)
  ctx.beginPath()
  ctx.rect(0,0,1080,1080)
  ctx.fillStyle = '#f2e7a0'
  ctx.fill()
  ctx.rect(10,10,1060,1060)
  ctx.strokeStyle = '#214063'
  ctx.stroke()
  ctx.fillStyle = '#1c2024'
  ctx.font = '60px Playfair Display SC'
  ctx.textAlign = 'center'
  ctx.fillText('Library Card',534,100)
  ctx.strokeStyle = '#214063'

  ctx.beginPath()
  ctx.moveTo(10,154)
  ctx.lineTo(1070,154)
  ctx.moveTo(10,160)
  ctx.lineTo(1070,160)

  ctx.moveTo(10,280)
  ctx.lineTo(1070,280)

  ctx.moveTo(10,400)
  ctx.lineTo(1070,400)

  for (y=406; y < 1060; y+=100) {
    ctx.moveTo(10, y)
    ctx.lineTo(1070, y)
  }

  ctx.moveTo(300,406)
  ctx.lineTo(300,1070)

  ctx.stroke()

  ctx.font = '24px Montserrat'
  ctx.textAlign = 'left'
  ctx.fillStyle = '#214063'
  ctx.fillText('AUTHOR',20,186)
  ctx.fillText('TITLE',20,306)
  ctx.fillText('DATES',110,432)
}
if (sessionStorage.length !== 0) {
  initCard(ctx)
  generateCard(cardData,ctx)
} else {
  initCard(ctx)
}

function dataSplit(data,x,y1,y2,y3) {
  if (data && data.length > 60) {
    ctx.font = '30px Playfair Display'
    let splitArray = data.match(/.{1,60}(\s|$)/g)
    ctx.fillText(splitArray[0],x,y1)
    ctx.fillText(splitArray[1],x,y2)
  } else {
    ctx.font = '40px Playfair Display'
    ctx.fillText(data,x,y3)
  }
}

function getDate(whichDate) {
  new Pikaday({
    field: document.getElementById(whichDate)
  })
}

function dateSplit(bookDate,x,y1,y2) {
  let dateArray = []
  dateArray[0] = bookDate.toString().substr(0,4)
  dateArray[1] = bookDate.toString().substr(4)
  ctx.textAlign = 'left'
  ctx.fillText(dateArray[0],x,y1)
  ctx.fillText(dateArray[1],x,y2)
}

const allGenres = [
  '',
  'Fashion',
  'Cities',
  'Philosophy',
  'Ecology',
  'Travel',
  'Photography',
  'Futurism',
  'Cozy',
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
]

function generateCard(cardInfo,ctx) {
  initCard(ctx)

  ctx.fillStyle = '#1c2024'
  dateSplit(cardInfo.startDate,60,550,580)
  dateSplit(cardInfo.endDate,60,650,680)
  ctx.font = '40px Playfair Display'
  ctx.textAlign = 'center'
  dataSplit(cardInfo.title,540,320,380,360)
  dataSplit(cardInfo.author,540,200,260,240)
  ctx.fillText(cardInfo.genre1,660,570)
  ctx.fillText(cardInfo.genre2,660,670)
  dataSplit(cardInfo.sentence,660,950,990,970)

  ctx.fillStyle = '#dc143c'

  if (cardInfo.isComplete == 'true') {
    ctx.fillText('Completed!',660,870)
  } else if (cardInfo.isComplete == 'false') {
    ctx.fillText('Did Not Finish',660,870)
  } else {
    // no info
  }

  ctx.textAlign = 'center'

  if (cardInfo.rating > 0) {
    let i = 0
    let xo = 640-((cardInfo.rating/2)*40)
    let x = xo
    do {
      i++
      x+=40
      ctx.fillText('\u2605',x,770)
    } while (i<cardInfo.rating)
  } else {
    // no rating
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
    sentence: '',

    genres: allGenres.sort(),

    stars: [
      '',
      '\u2605',
      '\u2605 \u2605',
      '\u2605 \u2605 \u2605',
      '\u2605 \u2605 \u2605 \u2605',
      '\u2605 \u2605 \u2605 \u2605 \u2605',
    ],

    startDate: new Pikaday({
      field: document.getElementById('startDate')
    }),

    endDate: new Pikaday({
      field: document.getElementById('endDate')
    }),

    newCard() {
      newVal = {
        title: this.title,
        author: this.author,
        genre1: this.genre1,
        genre2: this.genre2,
        rating: this.rating,
        startDate: this.startDate.toString(),
        endDate: this.endDate.toString(),
        isComplete: this.isComplete,
        sentence: this.sentence,
      }

      card = {
        title: cardData.title,
        author: cardData.author,
        genre1: cardData.genre1,
        genre2: cardData.genre2,
        rating: cardData.rating,
        startDate: cardData.startDate,
        endDate: cardData.endDate,
        isComplete: cardData.isComplete,
        sentence: cardData.sentence,
      }

      Object.keys(newVal).forEach(function(key) {
        if (card[key] !== '' || card[key] !== newVal[key]) {
          card[key] = newVal[key]
        } else {
          card[key]
        }
      })

      sessionStorage.setItem('card', JSON.stringify(card))

      generateCard(card, ctx)
    }
  }
}
