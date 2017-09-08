import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import * as index from './app_server/routes/index';
import * as users from './app_server/routes/users';

/*Clears database and adds initial data*/
process.env.PROD = undefined;
const ConnectionString: string = "mongodb://localhost:27017";


import { MongoRepository } from './app_server/dataaccesslayer/implementations/MongoRepository';
import { WorkoutProgram } from './app_server/models/WorkoutProgram';
let db = MongoRepository.GetInstance<WorkoutProgram>();
db.Connect(ConnectionString, "ITTWEB-GRP40-ASSIGNMENT1")
.then(() => {
  let promises = [];
  db.GetAll().then((res) => {
    for(let wp of res){
      promises.push(db.Delete(wp));
    }
    return Promise.all(promises);
  })
})
.then(()=> db.Create({_id: undefined, Name: "Default", ExerciseList: [{Description: "Hulla hop", ExerciseName: "Ghey", RepsOrTime: "10", Sets: 100}]},
                     {_id: undefined, Name: "Sunday Workout", ExerciseList: [{Description: "Hulla hop", ExerciseName: "Ghey", RepsOrTime: "10", Sets: 100},
                                                                             {Description: "Hulla hop", ExerciseName: "Ghey", RepsOrTime: "10", Sets: 100},
                                                                             {Description: "Hulla hop", ExerciseName: "Ghey", RepsOrTime: "10", Sets: 100}]},
                     {_id: undefined, Name: "Lazy Monday", ExerciseList: []},
                     {_id: undefined, Name: "Freaky Friday", ExerciseList: [{Description: "Hulla hop", ExerciseName: "Ghey", RepsOrTime: "10", Sets: 100},
                                                                            {Description: "Hulla hop", ExerciseName: "Ghey", RepsOrTime: "10", Sets: 100},
                                                                            {Description: "Hulla hop", ExerciseName: "Ghey", RepsOrTime: "10", Sets: 100},
                     ]}))
.then((res) => console.log(res ? "WorkoutProgram created" : "Failure"))
.then(() => {
  db.GetAll().then((res) => console.log(res));
})

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
console.log(path.join(__dirname, 'public'));
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
