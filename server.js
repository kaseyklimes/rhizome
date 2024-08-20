const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.post('/contact', (req, res) => {
  res.redirect('/thank-you.html');
});

app.get('*', (req, res) => {
  if (req.path.endsWith('.html')) {
    res.sendFile(path.join(__dirname, 'public', 'html', req.path));
  } else {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});