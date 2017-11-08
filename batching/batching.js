import { subscribePricesBatch } from '../utils/api';
import * as constants from '../utils/CONSTANTS';
import { createTableRow } from "../utils/helper";

class Batching {

    constructor() {
        this.handleSubscribeToPricesBtnClick = this.handleSubscribeToPricesBtnClick.bind(this);
    }

    handlePriceUpdate(id, data) {

        const { Quote, Data } = data;
        if (Quote) {
            this.askPrices[id].textContent = Quote.Ask;
            this.bidPrices[id].textContent = Quote.Bid;
        } else if (Data.Quote) {
            this.askPrices[id].textContent = Data.Quote.Ask;
            this.bidPrices[id].textContent = Data.Quote.Bid;
        }
    }

    handleSubscribeToPricesBtnClick() {
        // some hard coded values for instruments
        this.instruments = [{
            AssetType: "FxSpot",
            Uic: 2071,
            Symbol: "SBFX"
        },
            {
                AssetType: "FxSpot",
                Uic: 31,
                Symbol: "SBFX1"
            },
            {
                AssetType: "FxSpot",
                Uic: 19,
                Symbol: "SBFX2"
            }];

        const { instruments } = this;

        // createTableRow(instruments);
        this.askPrices = {};
        this.bidPrices = {};

        for (let i = 0; i < instruments.length; i++) {
            let table = document.getElementsByClassName("table-body")[0];
            table.append(createTableRow(instruments[i]));
            this.askPrices[instruments[i]['Uic']] = document.getElementsByClassName('ask-cell-' + instruments[i]['Uic'])[0];
            this.bidPrices[instruments[i]['Uic']] = document.getElementsByClassName('bid-cell-' + instruments[i]['Uic'])[0];

            subscribePricesBatch(constants.accessToken, instruments[i], this.handlePriceUpdate.bind(this, instruments[i].Uic)
                // error callback in case open api client lib throws error
                , (err) => {
                    console.log("error inside open api client lib", err);
                }).then(
                // success callback when subscription requests are successfull
                (subscription) => console.log("subscription approved", subscription)
                ,
                // error callback when request fails
                (err) => console.log("error in request", err)
            );
        }
    }
}

const batching = new Batching();

window.handleSubscribePricesBtnClick = batching.handleSubscribeToPricesBtnClick;