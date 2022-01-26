const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/peninsula-invoice-app')));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/peninsula-invoice-app'}
  );
});
  
const port = process.env.PORT || 5000;
app.listen(port);