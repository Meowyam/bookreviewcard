console.log("hello");

const c = document.getElementById("cardCanvas")
const ctx = c.getContext("2d")

function initCard(ctx) {
  ctx.setTransform(1,0,0,1,0,0)
  ctx.clearRect(0,0,540,540)
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

function dataSplit(data,y1,y2,y3) {
  if (data.length > 60) {
    ctx.font = '14px Playfair Display'
    let splitArray = data.match(/.{1,60}(\s|$)/g)
    ctx.fillText(splitArray[0],270,y1)
    ctx.fillText(splitArray[1],270,y2)
  } else {
    ctx.font = '18px Playfair Display'
    ctx.fillText(data,270,y3)
  }
}

function dateSplit(bookDate,x,y1,y2) {
  let dateArray = []
  dateArray[0] = bookDate.toString().substr(0,4)
  dateArray[1] = bookDate.toString().substr(4)
  ctx.textAlign = 'left'
  ctx.fillText(dateArray[0],x,y1)
  ctx.fillText(dateArray[1],x,y2)
}

function generateCard(cardInfo,ctx) {
  initCard(ctx)

  ctx.fillStyle = '#1c2024'
  dateSplit(cardInfo.startDate,30,235,250)
  dateSplit(cardInfo.endDate,30,275,290)
  ctx.font = '18px Playfair Display'
  ctx.textAlign = 'center'
  dataSplit(cardInfo.title,160,190,180)
  dataSplit(cardInfo.author,100,130,120)
  ctx.fillText(cardInfo.genre1,330,250)
  ctx.fillText(cardInfo.genre2,330,300)

  ctx.fillStyle = '#dc143c'
  ctx.font = '20px Playfair Display'

  if (cardInfo.isComplete == 'true') {
    ctx.fillText('Completed!',330,480)
  } else if (cardInfo.isComplete == 'false') {
    ctx.fillText('Did Not Finish',330,480)
  } else {
    // no info
  }

  if (cardInfo.rating > 0) {
    let i = 0
    let x = 270
    do {
      i++
      x+=20
      ctx.textAlign = 'center'
      ctx.fillText('\u2605',x,440)
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
      newVal = [
        this.title,
        this.author,
        this.genre1,
        this.genre2,
        this.rating,
        this.startDate,
        this.endDate,
        this.isComplete
      ]

      newVal.forEach(function(value, i){
        if (card[i] !== '' || card[i] !== value) {
          card[i] = value
        } else {
          card[i]
        }
      })

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
