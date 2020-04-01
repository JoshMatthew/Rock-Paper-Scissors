const express = require('express')
const path = require('path')

const app = express()

// set static files
app.use(express.static(path.join(__dirname, 'public')))

const PORT = 8080 || process.env.PORT

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))