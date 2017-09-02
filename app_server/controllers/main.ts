/* GET homepage */

export class HomeController {
    constructor() {}

    static index(req, res) {
        let array: any[];
        array = [{Exercise: 'Bane', Description: 'Digg', Set: 'Nigger', Reps: 'Darling'}]
        res.render('index', { title: 'Workout Program', array: array});
    };// ok
}