const express = require('express');
const app = express();
const port = 3011;

app.get('*', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>project-c</title>
                <style>
                    #app {
                        width: 1000px;
                        height: 100px;
                        position: absolute;
                        top:0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: auto;
                        text-align: center;
                        vertical-align: middle;
                        line-height: 50px;
                        font-size: 30px;
                    }
                    #count {
                        font-size: 50px;
                    }
                </style>
            </head>
            <body>
            <div id="app">
                <div>Count of visits: </div>
                <div id="count">0</div>
            </div>
            <script>
                //Handler when the DOM is fully loaded
                document.addEventListener("DOMContentLoaded", function(){
                    //When we refresh the page, fire the request to increase users count
                    logNewUser();
                    //Get the actual number of users which have loaded the index page of the application
                    getUsersCount();
                });
              
                //Sending a request to increase users count to api
                async function logNewUser(){
                    await fetch('http://localhost:3012/count', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json;charset=utf-8'
                        }
                    });
                }
                
                //Getting users count from the api
                async function getUsersCount(){
                    let response = await fetch('http://localhost:3012/count', {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json;charset=utf-8'
                        }
                    });
                    
                    let body = await response.json();
                    
                    let counter = document.getElementById('count');
                    counter.innerHTML = body.data.count;
                }
            </script>
            </body>
        </html>
    `);
});

app.listen(port);

console.log('listening on port :' + port);
