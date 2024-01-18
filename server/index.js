const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());

// Your other middleware and routes here

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Catch-all route to serve the React app
app.get('/v1', (req, res) => {
  res.status(200).json({message:"ok"})
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
