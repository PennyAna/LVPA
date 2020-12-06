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
        const result = await client.query('SELECT * FROM media_table');
        const results = { 'results': (result) ? result.rows: null};
        const result_genre = await client.query('SELECT * FROM genre_table');
        results.append( { 'genre results': (result_genre) ? result_genre.rows: null});
        const result_user = await client.query('SELECT * FROM login_table');
        results.append( = { 'user results': (result_user) ? result_user.rows: null});
        res.render('pages/db.ejs', results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
    try {
        const client = await pool.connect();
        
        res.render('pages/db.ejs', results_user);
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