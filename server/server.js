const express = require('express');
const cors = require('cors');
const {routes} = require('./config/routes');

const port = 8080;

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === "OPTIONS") {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE')
    res.header('Access-Control-Allow-Origin', "*")
    return res.status(200).json({})
  }
  next();
})
app.use(express.json());
app.use('/api', routes);
app.use('/static', express.static('public'))

app.listen(port, () => {console.log('listening to port: ', port)})