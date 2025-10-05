const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// so Heroku passes along the original host/proto
app.enable('trust proxy');

// ✅ redirect newsletter.rhizomerd.com → newsletter.getprimitive.ai (keep path & query)
app.use((req, res, next) => {
  const host = (req.hostname || '').toLowerCase();
  if (host === 'newsletter.rhizomerd.com') {
    const target = 'https://newsletter.getprimitive.ai' + req.originalUrl;
    return res.redirect(301, target);
  }
  next();
});

// your normal site
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  if (req.path.endsWith('.html')) {
    // NOTE: if you actually need to serve /foo.html files, use a safe join:
    const file = path.join(__dirname, 'public', 'html', req.path.replace(/^\//, ''));
    res.sendFile(file);
  } else {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
