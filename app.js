// BEGIN fake database
// you can replace all of this with "real" database calls

// change this to "slow things down"...a timeout of 5000 (5 seconds) will be really noticeable
const DB_TIMEOUT = 500

function fakeDbCallback(cb) {
  setTimeout(() => cb(null, 'example data A'), DB_TIMEOUT)
}

function fakeDbPromise() {
  return new Promise(resolve =>
    setTimeout(() => resolve('example data B'), DB_TIMEOUT)
  )
}

// END fake database

const express = require('express')
const app = express()

app.get('/home', async (req, res) => {
  const data = await fakeDbPromise()
  res.send('database  returned: ' + data)
})

app.get('*', (req, res) => {
  fakeDbCallback((err, data) => {
    console.log('database returned: ' + data)
    console.log('redirecting')
    res.redirect('/home')
  })
})

const port = 5555
app.listen(port, () => console.log(`app started on port ${port}`))
