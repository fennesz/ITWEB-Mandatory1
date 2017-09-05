import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import * as index from './app_server/routes/index';
import * as users from './app_server/routes/users';

import { MongoRepository } from './app_server/dataaccesslayer/MongoRepository';
import { WorkoutProgram } from './app_server/models/WorkoutProgram';
let db = new MongoRepository<WorkoutProgram>();
db.Connect("mongodb://localhost:4242").then(res => {
  return db.Create("WorkoutPrograms", {_id: undefined, ExerciseList: []}).then((res) => {
    console.log(res ? "WorkoutProgram created" : "Failure");
  });
});


var app = express();

// view engine setup YO
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  (<any>err).status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("App started");

module.exports = app;
