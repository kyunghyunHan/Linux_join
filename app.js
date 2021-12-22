const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');


dotenv.config();

const authRouter = require('./routes/auth');

const { sequelize } = require('./models');
// const passportConfig = require('./passport');
const mainRouter = require('./routes/main');






const http = require("http")
const app = express();
const server = http.createServer(app);


const moment = require("moment");
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul");
// exports.moment=moment;


// const socketIO = require("socket.io");
// const io = socketIO(server);

// io.on("connection",(socket)=>{

//   socket.on("chatting",(data)=>{
//       const { name, msg } = data;
//       io.emit("chatting", {
//           name,
//           msg,
//           time: moment(new Date()).format("h:ss A")
//       })
//   });
// })

// passportConfig(); // 패스포트 설정

app.set('port', process.env.PORT || 6002);
app.set('view engine', 'htm');
nunjucks.configure('views', {
  express: app,
  watch: true,

});
sequelize
  .sync({ focus: false })
  .then(() => {
    console.log("*** MySQL 연결 성공 ***");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

//라우터
app.use('/', mainRouter);

app.use('/auth', authRouter);


app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


server.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
