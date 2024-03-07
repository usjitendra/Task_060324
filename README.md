1. create Mongodb -> "taskdb"
     npm start -  To start the application
     

2. Api's Access : 

    i) http://localhost:8080/getAccountDetails

    var request = require('request');
    var options = {
    'method': 'GET',
    'url': 'http://localhost:8080/getAccountDetails',
    'headers': {
        'auth': 'e04a1c2-5408-98179-cb581462e25e-680c1ed-f5f7e13401b01b-c228e887-82a2a70'
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });


    ii) http://localhost:8080/userRegistration

    var request = require('request');
    var options = {
    'method': 'POST',
    'url': 'http://localhost:8080/userRegistration',
    'headers': {
        'auth': 'e04a1c2-5408-98179-cb581462e25e-680c1ed-f5f7e13401b01b-c228e887-82a2a70',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username": "Jitendra singh",
        "email": "jitendra@gmail.com",
        "password": "123456",
        "api_key": "adasdaads",
        "api_secret": "3333333"
    })

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });


iii) http://localhost:8080/login

    var request = require('request');
    var options = {
    'method': 'POST',
    'url': 'http://localhost:8080/login',
    'headers': {
        'auth': 'e04a1c2-5408-98179-cb581462e25e-680c1ed-f5f7e13401b01b-c228e887-82a2a70',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "email": "jitendra@gmail.com",
        "password": "123456"
    })

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });


iv) http://localhost:8080/addstock

    var request = require('request');
    var options = {
    'method': 'POST',
    'url': 'http://localhost:8080/addstock',
    'headers': {
        'auth': 'e04a1c2-5408-98179-cb581462e25e-680c1ed-f5f7e13401b01b-c228e887-82a2a70',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjY1ZTg2MGQ2ZmEwNTg4NTI3ZDFmODhlMCJ9LCJpYXQiOjE3MDk3ODI0NTl9.1_5Y_pIiTcqMC9ZuoQz0XxNpu6hJMaxjphcKDEYGpCs'
    },
    body: JSON.stringify({
        "_id": "65e860d6fa0588527d1f88e0",
        "stock": 10,
        "action": "buy"
    })

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });

