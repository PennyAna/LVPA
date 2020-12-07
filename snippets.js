const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require(' bcrupt');
const uuidv4 = require('uuid/v4');

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/')));
app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.get('/', function (req, res, next) { 
    res.render('index', {
        title: "Home", 
        userData: req.user, 
        messages: {
            danger: req.flash('danger'), 
            warning: req.flash('warning'), 
            success: req.flash('success')}});
});
app.post('/', async function (req, res) {
    try {
        const client = await pool.connect()
        await client.query('BEGIN')
        var pwd = await bcrypt.hash(req.body.password, 5);
        await JSON.stringify(client.query('SELECT id FROM "users" WHERE "email"=$1', [req.body.username], function(err, result) {
            if (result.rows[0]) {
                req.flash('warning', "This email address is already registered. <a href='/'>Log in!</a>");
                res.redirect('/');
            }
            else {
                client.query( 'INSERT INTO login_table (username, password, email, "first_name", "last_name") VALUES ($1, $2, $3, $4, $5)', [uuidv4(), req.body.first_name, req.body.last_name, req.body.username, pwd], function(err, result {
                    if(err) {console.log(err);}
                    else {
                        client.query('COMMIT')
                        console.log(result)
                        req.flash('success', 'User created.')
                        res.redirect('/main.ejs');
                        return;
                    }
                });
            }
        }));
        client.release();
    }
    catch(e) {throw (e)}
});
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
    user: process.env.PGUSER, 
    host: process.env.PGHOST, 
    password: process.env.PGPASSWORD, 
    connectionString: process.env.DATABASE_URL, 
    ssl: true
}); 

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
app.listen(app.get('port'), function() {
  console.log('Now listening for connections on port: ', app.get('port'));
});