const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());
// app.use(cors()); // dar acceso a todos

const whitelist = ['http://localhost:8000', 'http://localhost:5500'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)) {
      callback(null, true)
    }else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));


app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

// uso de middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
