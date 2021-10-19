let express = require('express');
let dbStart = require('./dbConnection');
let register = require('./routes/register');
let login = require('./routes/login');

dbStart();

let app = express();
app.use(express.json());

let PORT = process.env.PORT || 7000;

app.get('/', (req, res) => {
  console.log(`Request body of / route `, req);
  res.json({ 'Base Route': 'WebApp' });
});

app.use('/user/register', register);
app.use('/user/authenticate', login);

app.listen(PORT, () => {
  console.log(`Application running on Port ${PORT}`);
});
