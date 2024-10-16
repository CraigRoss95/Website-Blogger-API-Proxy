const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicasce = require('apicache')

// load env vars

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

//setup cashe
let cache = apicasce.middleware

//gets ids probobly dosnt need params to pass in
router.get('/ids',cache('2 minutes'), async (request,response) => {
    const params = new URLSearchParams ({
        [API_KEY_NAME]: API_KEY_VALUE,
        ...url.parse(request.url,true).query
    })


    if(process.env.NODE_ENV !== 'production') {
        console.log(`REQUEST: ${API_BASE_URL}${params}`)
    }
    try {
    const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
    const data = apiRes.body
    response.status(200).json(data)

    } catch(error){
        response.status(500).json({error})
    }
})

module.exports = router