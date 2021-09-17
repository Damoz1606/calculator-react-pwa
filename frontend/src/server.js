const express = require('express');
const path = require('path');

app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.resolve('./build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./build/index.html'));
})

app.listen(app.get('port'), () => console.log('The server is running...'))