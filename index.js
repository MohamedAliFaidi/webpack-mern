const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const less = require('serverless-http');

// app.use(helmet())
// app.use(helmet.hidePoweredBy())
// app.use(helmet.frameguard({action: 'deny'}))
// app.use(helmet.xssFilter())
// app.use(helmet.noSniff())
// app.use(helmet.ieNoOpen())
// app.use(helmet.hsts({maxAge:90*24*60*60 , force: true}))
// app.use(helmet.dnsPrefetchControl())


app.use(cors({
  origin: '*',
  credentials: true
}))

app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE',);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', 'https://client-delta-gold.vercel.app');
  // Add other headers as needed
  next();
});

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

allowCors(app.get('/v1', (req, res) => {
  console.log(req.headers)
  console.log(req.ip,req.ips)
  res.status(200).json({message:"ok"})
})
)
// Your other middleware and routes here

// Serve static files from the React app

// Catch-all route to serve the React app
// app.get('/v1', (req, res) => {
//   console.log(req.headers)
//   console.log(req.ip,req.ips)
//   res.status(200).json({message:"ok"})
// });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports.handler = less(app);

