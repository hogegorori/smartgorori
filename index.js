var pg = require('pg');
var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/test/*', function(request, response) {
  response.render('pages/test');
});

app.get('/python/*', function(request, response) {
  response.render('pages/article');
});

app.get('/nodejs/*', function(request, response) {
  response.render('pages/article');
});

app.get('/other/*', function(request, response) {
  var category = request.url.split('/')[1];
  var id = request.url.split('/')[2];
  response.render('pages/article',
    {
      send_category: category,send_id: id
    }
  );
});

app.get('/times', function(request, response) {
    var result = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
      result += i + ' ';
  response.send(result);
});

app.get('/db', function (request, response) {
    pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


