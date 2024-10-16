const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 5000;

const app = express()

//rate limiting
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5
}
)

app.use(limiter)
app.set('trust proxy', 1)


//routes
app.use('/api', require('./routes/blogger'))

//enable cors
app.use(cors())
app.listen(PORT, () => console.log (`server running on port ${PORT}`))
