import {getUserDetails} from '../batching/api.js';

let accessToken = 'eyJhbGciOiJFUzI1NiIsIng1dCI6IkQ0QUU4MjQ2RDYyNTBFMTY5Njg4NDFCREY4Nzc2MTI4NUMwNUJCMUYifQ.eyJvYWEiOiI3Nzc3NyIsImlzcyI6Im9hIiwiYWlkIjoiMTEwIiwidWlkIjoiWVEtbDF0c3V4M1JZRDBXTGdpMXNiUT09IiwiY2lkIjoiWVEtbDF0c3V4M1JZRDBXTGdpMXNiUT09IiwiaXNhIjoiVHJ1ZSIsInRpZCI6IjIwMDIiLCJzaWQiOiJlOTdmZjlkZDgzNDY0OTFhYTRiNWE3ZTZiNzBjYWI1NSIsImRnaSI6IjgyIiwiZXhwIjoiMTUxMDA0MzUxNiJ9.fFcYYvID-7Optk_dOlk5GMCYRRxCLi8wKWlbix8lwYUo5IViW8PSICLm7TvxYdBuIzTNYJVjxE3FXOI8ONZjHQ';
document.getElementById('get_user_details').addEventListener('click',getDetails);

function getDetails(){
    let tbody = document.getElementsByClassName('user_details')[0];
    getUserDetails(accessToken).then((result) => {
        if(tbody.innerHTML){
            tbody.innerHTML = '';
            for(let prop in result.response){
                let tr = document.createElement('tr');
                let key = document.createElement('td');
                let value = document.createElement('td');
                key.appendChild(document.createTextNode(prop))
                value.appendChild(document.createTextNode(result.response[prop]));
                tr.appendChild(key);
                tr.appendChild(value);
                tbody.appendChild(tr);
            }
        }
    });
}
