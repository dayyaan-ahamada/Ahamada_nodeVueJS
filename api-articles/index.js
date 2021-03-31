const express = require('express')
const config = require('./conf/conf.js')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const passport = require('passport')
const cors = require('cors')
const routes = require('./routes/publicRoutes.js')
const secureRoute = require('./routes/secureRoutes.js')

require('./authentication/authentication.js')
app.use(cors())
app.use(bodyParser.json())

axios.interceptors.request.use((conf) => {
    conf.headers = {
        "x-apikey": config.API_KEY
    }
    return conf
})

app.use('/', routes);
app.use('/secure', passport.authenticate('jwt', {session: false}), secureRoute);

app.listen(config.PORT, function () {
    console.log("LE SERVEUR EST PRÊT")
})
