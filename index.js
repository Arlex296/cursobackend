import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

//RUTAS
import authRoute from './routes/auth.js'
import candidatosRoute from './routes/candidatos.js'
import ciudadanosRoute from './routes/ciudadanos.js'
import eleccionesRoute from './routes/elecciones.js'
import inscripcionesRoute from './routes/inscripciones.js'
import paisesRoute from './routes/paises.js'
import perfilesRoute from './routes/perfiles.js'
import tiposEleccionesRoute from './routes/tiposElecciones.js'
import votosRoute from './routes/votos.js'

const app = express()
const port = 8800
dotenv.config()

app.use(cookieParser())
app.use(express.json())

//* todo en la ultima session instalamos en dotenv
// todo enla ultima session instalamoS MONGODB

const connect = async() => {
    try {
        const myConn = await mongoose.connect(process.env.MONGO)
        console.log("Conectado a mongoDB")
    } catch (error) {
        console.log(error.message)
    }
}


app.get('/', (req, res) => {
    res.send(`${process.env.TITLE}`)
})
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/candidatos", candidatosRoute);
app.use("/api/v1/ciudadanos", ciudadanosRoute);
app.use("/api/v1/elecciones", eleccionesRoute);
app.use("/api/v1/inscripciones", inscripcionesRoute);
app.use("/api/v1/paises", paisesRoute);
app.use("/api/v1/perfiles", perfilesRoute);
app.use("/api/v1/tiposElecciones", tiposEleccionesRoute);
app.use("/api/v1/votos", votosRoute);

// middleware para  verificar  el  token d e autenticacion en  todas  las  rutas  requeridas

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Servidor no disponible"

    return res.status(errorStatus).json({
        message: errorMessage,
        success: false,
        status: errorStatus
    })
})

app.listen(port, () => {
    connect()
    console.log(`Example app listening on port ${port}`)
})
app.use(express.json());