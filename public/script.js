console.log("hello");

let screenw = window.innerWidth
let size = 'sm'
let shrink
if (screenw > 1023) {
  size = 'lg'
  shrink = 1
} else if (1024 > screenw && screenw > 767){
  size = 'md'
  shrink = 0.75
} else if (768 > screenw) {
  shrink = 0.6
}

const c = document.getElementById("cardCanvas")
const ctx = c.getContext("2d")

function initCard(ctx,size) {
  ctx.setTransform(1,0,0,1,0,0)
  ctx.clearRect(0,0,540*shrink,540*shrink)
  ctx.beginPath()
  ctx.rect(0,0,540*shrink,540*shrink)
  ctx.fillStyle = '#f2e7a0'
  ctx.fill()
  ctx.rect(5*shrink,5*shrink,530*shrink,530*shrink)
  ctx.strokeStyle = '#214063'
  ctx.stroke()
  ctx.fillStyle = '#1c2024'
  if (size == 'lg') {
    ctx.font = '30px Playfair Display SC'
  } else {
    ctx.font = '20px Playfair Display SC'
  }
  ctx.textAlign = 'center'
  ctx.fillText('Library Card',267*shrink,50*shrink)
  ctx.strokeStyle = '#214063'

  ctx.beginPath()
  ctx.moveTo(5*shrink,77*shrink)
  ctx.lineTo(535*shrink,77*shrink)
  ctx.moveTo(5*shrink,80*shrink)
  ctx.lineTo(535*shrink,80*shrink)

  ctx.moveTo(5*shrink,140*shrink)
  ctx.lineTo(535*shrink,140*shrink)

  ctx.moveTo(5*shrink,200*shrink)
  ctx.lineTo(535*shrink,200*shrink)

  for (y=203*shrink; y < 530*shrink; y+=50*shrink) {
    ctx.moveTo(5*shrink, y)
    ctx.lineTo(535*shrink, y)
  }

  ctx.moveTo(150*shrink,203*shrink)
  ctx.lineTo(150*shrink,535*shrink)

  ctx.stroke()

  if (size == 'lg') {
    ctx.font = '12px Montserrat'
  } else {
    ctx.font = '8px Montserrat'
  }
  ctx.textAlign = 'left'
  ctx.fillStyle = '#214063'
  ctx.fillText('AUTHOR',10*shrink,93*shrink)
  ctx.fillText('TITLE',10*shrink,153*shrink)
  ctx.fillText('DATES',55*shrink,216*shrink)
}
initCard(ctx,size)

function dataSplit(data,y1,y2,y3) {
  if (data.length > 60) {
    if (size == 'lg') {
      ctx.font = '14px Playfair Display'
    } else {
      ctx.font = '12px Playfair Display'
    }
    let splitArray = data.match(/.{1,60}(\s|$)/g)
    ctx.fillText(splitArray[0],270*shrink,y1)
    ctx.fillText(splitArray[1],270*shrink,y2)
  } else {
    if (size == 'lg') {
      ctx.font = '18px Playfair Display'
    } else {
      ctx.font = '14px Playfair Display'
    }
    ctx.fillText(data,270*shrink,y3)
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

function generateCard(cardInfo,ctx,size) {
  initCard(ctx,size)

  ctx.fillStyle = '#1c2024'
  dateSplit(cardInfo.startDate,30*shrink,275*shrink,290*shrink)
  dateSplit(cardInfo.endDate,30*shrink,325*shrink,340*shrink)
  if (size == 'lg') {
    ctx.font = '18px Playfair Display'
  } else {
    ctx.font = '16px Playfair Display'
  }
  ctx.textAlign = 'center'
  dataSplit(cardInfo.title,160*shrink,190*shrink,180*shrink)
  dataSplit(cardInfo.author,100*shrink,130*shrink,120*shrink)
  ctx.fillText(cardInfo.genre1,330*shrink,285*shrink)
  ctx.fillText(cardInfo.genre2,330*shrink,335*shrink)

  ctx.fillStyle = '#dc143c'
  if (size == 'lg') {
    ctx.font = '20px Playfair Display'
  } else {
    ctx.font = '15px Playfair Display'
  }

  if (cardInfo.isComplete == 'true') {
    ctx.fillText('Completed!',330*shrink,480*shrink)
  } else if (cardInfo.isComplete == 'false') {
    ctx.fillText('Did Not Finish',330*shrink,480*shrink)
  } else {
    // no info
  }

  ctx.textAlign = 'center'

  if (cardInfo.rating > 0) {
    let i = 0
    let xo = 320-((cardInfo.rating/2)*20)
    let x = xo*shrink
    do {
      i++
      x+=20*shrink
      console.log(x)
      ctx.fillText('\u2605',x,430*shrink)
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
      generateCard(card, ctx, size)
    }
  }
}
