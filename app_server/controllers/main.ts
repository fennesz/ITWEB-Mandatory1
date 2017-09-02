/* GET homepage */

export class HomeController {
    constructor() {}

    static index(req, res) {
        res.render('index', { title: 'Workout Program'});
    };// ok
}