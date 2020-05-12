const express = require('express');
const cors = require('cors');
const app = express();

//We are using cors module to be able to do requests
//from different origin, in our case 'localhost:3011'
app.use(cors());

//Using the local state variable instead of a database,
//for convenience of setting up the project
let storage = {
    'count': 0,
    'errors': []
};

//GET method which will return us the value of 'count' from the local state
app.get('/count', function (req, res) {
    let result = {
        'data': {
            count: storage.count
        },
        'status': 'ok'
    };

    res.json(result);
});

//POST method, which will increment the value of 'count' in the local state
app.post('/count', function (req, res) {
    //For the sake of error handling testing,
    //we will assume that we don't have much memory :D
    if (storage.count >= 10) {
        throw Error(
            'Count could not be more than 10, ' +
            'or our server will have storage overflow :)'
        );
    }

    //Increasing the counter with each request
    storage.count++;

    let result = {
        'data': {
            count: storage.count
        },
        'status': 'ok'
    };

    res.json(result);
});

//GET method which will return all logged errors from local state
app.get('/error', function (req, res) {
    let result = {
        'data': {
            errors: storage.errors
        },
        'status': 'ok'
    };

    res.json(result);
});

//This is the place where we define a custom error handling function
app.use(function (err, req, res, next) {
    //Logging all of the errors into the local state
    storage.errors.push(err.stack);

    let result = {
        'data': {
            error: err.stack
        },
        'status': 'error'
    };

    res.status(500);
    res.json(result);
});

module.exports = app;
