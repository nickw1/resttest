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

app.delete('/connect', async(req, res) => {
    const response = await fetch(req.body.url, {
        method: 'DELETE'
    });
    res.status(response.status).set({'Content-Type': 'text/plain'});
    response.body.pipe(res);
});

app.all('/connect', async(req, res) => {
    if(["POST", "PUT"].indexOf(req.method) == -1) {
        res.status(405).json({error:`Unrecognised method ${req.method}`});
    } else {
        const response = await fetch(req.body.url, {
            method: req.method, 
            body: req.body.contentType=='application/json' ? JSON.stringify(req.body.data): req.body.data,
            headers: {
                'Content-Type': req.body.contentType 
            }
        });
        res.status(response.status).set({'Content-Type': 'text/plain'});
        response.body.pipe(res);
    }
});



app.listen(3200);    
