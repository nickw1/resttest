import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.get('/connect', async(req, res) => {
    const response = await fetch(req.query.url);
    res.status(response.status).set({'Content-Type': 'text/plain'});
    response.body.pipe(res);

});

app.post('/connect', async(req, res) => {
    console.log(req.body);
    const response = await fetch(req.query.url, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    res.status(response.status).set({'Content-Type': 'text/plain'});
    response.body.pipe(res);
});


app.delete('/connect', async(req, res) => {
    const response = await fetch(req.query.url, {
        method: 'DELETE'
    });
    res.status(response.status).set({'Content-Type': 'text/plain'});
    response.body.pipe(res);
});

app.listen(3200);    
