const express = require('express');
const app = express();
app.use('/', express.static('dist'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.get('/:id', function(req, res) {
    res.sendFile(__dirname + `/dist/pages/${req.params.id}.html`);
})

app.listen(process.env.PORT || 3000);
