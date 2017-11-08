import {getUserDetails} from '../batching/api.js';

let accessToken = 'eyJhbGciOiJFUzI1NiIsIng1dCI6IkQ0QUU4MjQ2RDYyNTBFMTY5Njg4NDFCREY4Nzc2MTI4NUMwNUJCMUYifQ.eyJvYWEiOiI3Nzc3NyIsImlzcyI6Im9hIiwiYWlkIjoiMTEwIiwidWlkIjoiWVEtbDF0c3V4M1JZRDBXTGdpMXNiUT09IiwiY2lkIjoiWVEtbDF0c3V4M1JZRDBXTGdpMXNiUT09IiwiaXNhIjoiVHJ1ZSIsInRpZCI6IjIwMDIiLCJzaWQiOiJmMzcyM2NhMWQ0NmM0ZmRmOTliODRjNzExYmMzNjQwYyIsImRnaSI6IjgyIiwiZXhwIjoiMTUxMDEzMDQxMiJ9.JMvCNotzu2ePJwBQqtPPatJQe3jyRjvNap_9_lihyuApvzxQoGjSbtiB6Ddgb4Ny_I4e4CAA9CyUim-Rp4N10A';

class UserDetails{
    constructor(){
        this.getDetails = this.getDetails.bind(this);
    }

    getDetails(){
        let tbody = document.getElementsByClassName('user-details')[0];
        getUserDetails(accessToken).then((result) => {
            if(tbody.innerHTML){
                tbody.innerHTML = '';
                for(let prop in result.response){
                    let tr = document.createElement('tr');
                    let key = document.createElement('td');
                    let value = document.createElement('td');
                    key.appendChild(document.createTextNode(prop));
                    value.appendChild(document.createTextNode(result.response[prop]));
                    tr.appendChild(key);
                    tr.appendChild(value);
                    tbody.appendChild(tr);
                }
            }
        });
    }
}

const Details = new UserDetails();
window.getDetailsBtnClick = Details.getDetails;