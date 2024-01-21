const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet())
app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({action: 'deny'}))
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.ieNoOpen())
app.use(helmet.hsts({maxAge:90*24*60*60 , force: true}))
app.use(helmet.dnsPrefetchControl())


app.use(cors({
  origin: ['https://client-delta-gold.vercel.app',"https://client-jnz9w24yk-mohamedalifaidi.vercel.app"],
  credentials: true
}))

app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE',"Access-Control-Allow-Origin");
  // Add other headers as needed
  next();
});

// Your other middleware and routes here

// Serve static files from the React app

// Catch-all route to serve the React app
app.get('/v1', (req, res) => {
  console.log(req.headers)
  console.log(req.ip,req.ips)
  res.status(200).json({message:"ok"})
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
