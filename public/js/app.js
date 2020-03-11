console.log('sample log')
/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
}) */

/* fetch('http://localhost:3000/weather?address=adsd231').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
        } else {
            console.log(data.forecast + ' --------- ' + data.location)
        }
    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorBlock = document.querySelector('#error')
const messageBlock = document.querySelector('#message')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    errorBlock.textContent = ''
    messageBlock.textContent = 'Loading...'

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                errorBlock.textContent = data.error
                messageBlock.textContent = ''
            } else {
                messageBlock.textContent = data.location + ' -> ' + data.forecast
            }
        })
    })
})