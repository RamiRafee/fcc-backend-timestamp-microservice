// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Define a route for /api/:date
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let timestamp;

  // Check if the date parameter is missing or empty
  if (!date) {
    // If it's empty, use the current time
    timestamp = Date.now();
  } else {
    // Check if the provided date is a valid date or a Unix timestamp
    if (!isNaN(date)) {
      // If the date is a number, assume it's a Unix timestamp
      timestamp = parseInt(date);
    } else {
      // Otherwise, parse the date string
      timestamp = Date.parse(date);
    }
  }

  // Check if the parsed timestamp is a valid number
  if (isNaN(timestamp)) {
    return res.json({ error: 'Invalid date' });
  }

  // Format the UTC date string
  const utcDate = new Date(timestamp).toUTCString();

  // Return the response with both unix and utc keys
  res.json({ unix: timestamp, utc: utcDate });
});