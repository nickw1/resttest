
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
        const responseJson = await response.json();
        document.getElementById('response').innerHTML = `<p><strong class='code${Math.floor(response.status/100)}'>HTTP Status Code ${response.status}</strong></p>`;
        const headersDiv = document.createElement("div");
        headersDiv.style.marginBottom = '4px';
        const b = document.createElement("b");
        b.appendChild( document.createTextNode("Response Headers:"))
        headersDiv.appendChild(b);
        headersDiv.appendChild(
            document.createElement('br')
        );
        Object.keys(responseJson.headers).forEach ( headerName => {
            console.log(headerName);
            console.log(responseJson.headers[headerName]);
            headersDiv.appendChild(
                document.createTextNode(
                    `${headerName} : ${responseJson.headers[headerName]}`
            ));
            headersDiv.appendChild(
                document.createElement('br')
            );
        });
        document.getElementById('response').appendChild(headersDiv); 
        const b2 = document.createElement("b");
        b2.appendChild( document.createTextNode("Response:"))
        document.getElementById('response').appendChild(b2);
        document.getElementById('response').appendChild(
            document.createElement('br')
        );
        const textNode = document.createTextNode(responseJson.content);
        document.getElementById('response').appendChild(textNode); 
    } catch(e) {
        alert(e);
    }
});
