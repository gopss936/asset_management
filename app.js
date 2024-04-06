
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./models');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

const PORT =  3000;

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });
