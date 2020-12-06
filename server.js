const express = require('express');
const path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/')));
app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function (req, res) { res.render('pages/index.ejs');})
app.get('/postage', function (req, res) {
    res.render('pages/postage.ejs');
 
});
app.get('/db', async function(req, res) {
    try {
        const client = await pool.connect();
        const result1 = await client.query('SELECT * FROM media_table');
        const results1 = { 'results1': (result1) ? result1.rows: null};
        const result2 = await client.query('SELECT * FROM genre_table');
        const results2 = { 'results2': (result2) ? result2.rows: null};
        const result3 = await client.query('SELECT * FROM login_table');
        const results3 = { 'results3': (result3) ? result3.rows: null};
        res.render('pages/db.ejs', results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})
const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
    ssl: {
        rejectUnauthorized: false
    }
}); 
app.listen(app.get('port'), function() {
  console.log('Now listening for connections on port: ', app.get('port'));
});