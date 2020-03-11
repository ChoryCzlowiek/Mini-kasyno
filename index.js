require('dotenv').config(); //  zaczytywanie zmiennych systemowych z `.env`
const express = require('express'); // framework do tworzenia serwerów WWW
const cors = require('cors'); // CROSS ORIGIN RESOURCE SHARING
const mongoose = require('mongoose'); // ORM do korzystania z bazy danych Mongo
const bodyParser = require('body-parser'); // middleware, które służy do
// zapisywania i odczywytania headera body z zapytań
const cookieParser = require('cookie-parser');  //  odczytywanie cookie z req.
const session = require('express-session'); // zarządzanie sesją użytkownika


const { PORT, DB_CONNECTION_STRING, AUTH_SECRET } = process.env;
// DESTRUKTURYZACJA (const { propA: propB } = obj;)
/* równoważny zapis:
  const PORT = process.env.PORT;
  const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
*/

mongoose.connect(
  DB_CONNECTION_STRING,
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log(
  `Successfully connected to the MongoDB at ${process.env.DB_CONNECTION_STRING}`
  );
});

const loggerMiddleware = (req, res, next) => {
  console.log('hostname = ', req.hostname);
  next();
};

const app = express();
const api = express.Router();

api.use('/user', require('./api/user/controller'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: AUTH_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(loggerMiddleware);
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`); // template literal
});
