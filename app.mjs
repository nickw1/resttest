import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.static('public'));
app.use(express.json());

let clientCookies = null;


app.all('/connect', async(req, res) => {
    const options = {
        method: req.method,
        headers: { }
    };
    if(clientCookies !== null) {
        options.headers.accept = '*/*';
        options.headers.cookie = clientCookies;
    }
    const url = req.method == 'GET' ? req.query.url : req.body.url;
    if(["POST", "PUT"].indexOf(req.method) > -1) {
        options.body =  req.body.contentType=='application/json' ? JSON.stringify(req.body.data): req.body.data;
        options.headers['Content-Type'] = req.body.contentType 
    }
    const response = await fetch(url, options);
    res.status(response.status).set({'Content-Type': 'text/plain'});

    const cookies = response.headers.raw()['set-cookie'];
    if(cookies?.length > 0) {
        clientCookies = cookies.map ( cookie => {
            return cookie.split(';')[0];
        }).join(';');
    } else {
        clientCookies = null;
    }

    const text = await response.text();
    // https://developers.cloudflare.com/workers/examples/logging-headers
    res.json({
        "headers":Object.fromEntries(response.headers), 
        "content": text
    });
});

app.listen(3200);    
