const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(cors())



//? modifique 
//* forma de ler JSON / middlewares
app.use(express.urlencoded({extended: true,}),)
app.use(express.json())


//* Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//* rota inicial / endpoint
app.get('/', (req, res) => {
    //* mostrar req

    res.json({ message: "Oi Express!" })
})

//* entregar uma porta
const DBname = "bancodaapi";
const DB_SERVER = "localhost";

mongoose
    .connect(
        `mongodb://${DB_SERVER}/${DBname}`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))
