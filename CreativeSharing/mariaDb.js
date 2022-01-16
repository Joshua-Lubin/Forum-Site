var mariaDb = require('mariasql');

var db = new mariaDb({
  host: 'localhost',
  user: 'root',
  password: ''
});

db.query('SHOW DATABASES', null, { useArray: true }, function(err, rows) {
  if (err)
    throw err;
  console.dir(rows);
});

db.end();
