const express = require('express')
const bodyParser = require('body-parser')

const homeRoutes = require('./routes/home')

const app = express()

app.use(bodyParser.json())
app.use('/',homeRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server running on PORT", PORT)
})