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
        const result_media = await client.query('SELECT * FROM media_table');
        const result_genre = await client.query('SELECT * FROM genre_table');
        const result_user = await client.query('SELECT * FROM login_table');
        const results = { 
            'results_media': (result_media) ? result_media.rows: null,
            'results_genre': (result_genre) ? result_genre.rows: null, 
            'results_user': (result_user) ? result_user.rows: null};
        res.render('pages/db.ejs', results);
        client.release();
        console.log(results);
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