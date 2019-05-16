const express = require('express');
const app = express();
app.use('/', express.static('dist', {
    extensions: ['html']
}));

app.listen(process.env.PORT || 3000);
