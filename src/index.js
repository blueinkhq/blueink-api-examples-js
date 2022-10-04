const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const examples = require('../src/routes/example.route')

const PORT = 4000;

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
	res.render('index');
});

app.use('/examples', examples);

app.listen(PORT, () => {
	console.log(`App listening on http://localhost:${PORT}`);
});
