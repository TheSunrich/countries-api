import express from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser";
import countryRoutes from "./routes/countryRoutes";
import mongoose, { ConnectOptions } from 'mongoose';

dotevnv.config()

if (!process.env.PORT) {
  console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)
const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error conectando a MongoDB', err));

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(bodyParser.json());


app.use("/countries", countryRoutes);


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});