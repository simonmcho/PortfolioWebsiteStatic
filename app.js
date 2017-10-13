//node modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Register body-parser, expressValidator, view engine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');//setting config parameters as ejs

//static content
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {

    });
});

app.listen(3000, () => {
    console.log("Listening to Andre 3000!");
});