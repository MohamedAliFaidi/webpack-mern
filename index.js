const dotenv = require( 'dotenv');
const express = require( 'express');
const helmet = require( 'helmet');

dotenv.config();

const app = express();

app.use(helmet())
app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({action: 'deny'}))
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.ieNoOpen())
app.use(helmet.hsts({maxAge:90*24*60*60 , force: true}))
app.use(helmet.dnsPrefetchControl())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5000, () => {
  // eslint-disable-next-line
  console.log('Server is running on port 5000');
});
