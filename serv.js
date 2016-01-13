var express = require('express');
var app =express();
// ------

/* GET home page. */
app.get('/', function(req, res) {
    res.sendFile('/Users/Matt/git/VIA/index.html');
});

app.use('/js', express.static('/Users/Matt/git/VIA/js'));
app.use('/css', express.static('/Users/Matt/git/VIA/css'));
app.use('/circle.skin', express.static('/Users/Matt/git/VIA/circle.skin'));
app.use('/do-or-do-not-there-is-no-try.mp3', express.static('/Users/Matt/git/VIA/do-or-do-not-there-is-no-try.mp3'));

app.listen(3000, function () {
  console.log('Listening on port 3000!');
})
