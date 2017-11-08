import { subscribeInfoPrices, removeIndividualSubscription } from '../utils/api';

let accessToken = 'eyJhbGciOiJFUzI1NiIsIng1dCI6IkQ0QUU4MjQ2RDYyNTBFMTY5Njg4NDFCREY4Nzc2MTI4NUMwNUJCMUYifQ.eyJvYWEiOiI3Nzc3NyIsImlzcyI6Im9hIiwiYWlkIjoiMTEwIiwidWlkIjoiWVEtbDF0c3V4M1JZRDBXTGdpMXNiUT09IiwiY2lkIjoiWVEtbDF0c3V4M1JZRDBXTGdpMXNiUT09IiwiaXNhIjoiVHJ1ZSIsInRpZCI6IjIwMDIiLCJzaWQiOiJmMzcyM2NhMWQ0NmM0ZmRmOTliODRjNzExYmMzNjQwYyIsImRnaSI6IjgyIiwiZXhwIjoiMTUxMDEzMDQxMiJ9.JMvCNotzu2ePJwBQqtPPatJQe3jyRjvNap_9_lihyuApvzxQoGjSbtiB6Ddgb4Ny_I4e4CAA9CyUim-Rp4N10A';

class handleSubscribe{
    constructor(){
        this.handlePriceUpdate = this.handlePriceUpdate.bind(this);
        this.subscribeToPrices = this.subscribeToPrices.bind(this);
        this.prettyPrint = this.prettyPrint.bind(this);
        this.subscription = null;
    }

    prettyPrint(obj) {
        if (!obj) return '';
        return JSON.stringify(obj, null ,3);
    }

    handlePriceUpdate(data){
        document.getElementById('snapshot').innerHTML = this.prettyPrint(data);
    }

    subscribeToPrices(subParam) {
        const instrument = {
            AssetType: "FxSpot",
            Uics: 2071
        };

        if(this.subscription === null){
            subscribeInfoPrices(accessToken, instrument, this.handlePriceUpdate).then((result) => {
                this.subscription = result;
            });
        }

        if(subParam){
            removeIndividualSubscription(accessToken, this.subscription);
        }
    }
}

const handleSubscribePrices = new handleSubscribe();
window.handleSubscribeBtnClick = handleSubscribePrices.subscribeToPrices;