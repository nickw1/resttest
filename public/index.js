
document.getElementById('send').addEventListener('click', async(e)=> {
    try {
        const url = document.getElementById('url').value;
        const method = document.getElementById('method').value;
        const requestBody = document.getElementById('requestBody').value;
        const contentType = document.getElementById('contentType').value;
        let response;
        if(method == 'GET') {
            response = await fetch(`/connect?url=${url}`);
        } else {
            const request = {
                data: contentType=='application/json' && method != "DELETE" ? JSON.parse(requestBody) : requestBody, 
                contentType: contentType,
                url: url
            };
            response = await fetch('/connect', {
                method: method,
                body: JSON.stringify(request),
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
