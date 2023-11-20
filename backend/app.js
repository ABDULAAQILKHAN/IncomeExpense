const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = 5000
app.use (express.urlencoded({
    extended: true
}));

const corsOptions = {
    origin: ['http://localhost:3000',
            ],
    credentials:true,            //access-control-allow-credentials:true,
    optionSuccessStatus:200
}
//middlewares
app.use(express.json())
app.use(cors(corsOptions))

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()