const express = require('express')
const port = process.env.PORT || 3000
const app = express()

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html')
})

app.use('/data', express.static('data'))
app.use('/dist', express.static('dist'))

app.listen(port, () => {
  console.log('started on port ' + port)
})
