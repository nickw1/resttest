
document.getElementById('send').addEventListener('click', async(e)=> {
    try {
        const url = document.getElementById('url').value;
        const method = document.getElementById('method').value;
        const requestbody = document.getElementById('requestbody').value;
        let response;
        if(method == 'GET') {
            response = await fetch(`/connect?url=${url}`);
        } else {
            response = await fetch(`/connect?url=${url}`, {
                method: method,
                body: requestbody,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        const responseText = await response.text();
        document.getElementById('response').innerHTML = `<p><strong class='code${Math.floor(response.status/100)}'>HTTP Status Code ${response.status}</strong></p>`;
        const textNode = document.createTextNode(responseText);
        document.getElementById('response').appendChild(textNode); 
    } catch(e) {
        alert(e);
    }
});
