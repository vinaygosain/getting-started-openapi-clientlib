import { subscribePrices } from "../utils/api";
import * as constants from '../utils/CONSTANTS';

class priceFormatting {

    constructor() {
        this.pricetable = document.getElementsByClassName("price-table-body")[0];

        this.assetType = this.pricetable.children[0].children[0];
        this.symbol = this.pricetable.children[0].children[1];

        this.askLabel = this.pricetable.children[1].children[1];

        this.bidLabel = this.pricetable.children[2].children[1];

        this.handlePriceUpdate = this.handlePriceUpdate.bind(this);
        this.subscribeToPrices = this.subscribeToPrices.bind(this);
    }

    handlePriceUpdate(data) {
        const { Quote, Data, DisplayAndFormat } = data;
        if (Quote) {
            this.assetType.textContent = data.AssetType;
            this.symbol.textContent = DisplayAndFormat.Symbol;
            this.askLabel.textContent = Quote.Ask;
            this.bidLabel.textContent = Quote.Bid;
            console.log(Quote);
        } else if (Data.Quote) {
            this.askLabel.textContent = Data.Quote.Ask;
            this.bidLabel.textContent = Data.Quote.Bid;
        }
    }

    subscribeToPrices() {
        const instrument = {
            AssetType: "FxSpot",
            Uic: 2071,
        }
        subscribePrices(constants.accessToken, instrument, this.handlePriceUpdate, (subscription) => {
            console.log(subscription);
        });
    }
}

const priceFormatter = new priceFormatting();
window.handleSubscribePricesBtnClick = priceFormatter.subscribeToPrices;