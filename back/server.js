const express = require('express');
const fileUpload = require('express-fileupload');
require('./src/config/dotenv')();
require('./src/config/sequelize');

const app = express();
const port = process.env.PORT;
const cors = require('cors');
const routes = require('./src/routes/routes');

//Config do upload do arquivo csv, em dir temporario
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir: '/tmp'
}));


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});
