import { subscribePrices } from './api';


class Batching {

    handlePriceUpdate(data) {
        console.log(data);
    }

    handleSubscribePricesBtnClick() {

        const instrument1 = {
            AssetType: "FxSpot",
            Uic: 2071,
        }

        const instrument2 = {
            AssetType: "FxSpot",
            Uic: 2071,
        }

        const instrument3 = {
            AssetType: "FxSpot",
            Uic: 2071,
        }

        subscribePrices(accessToken, instrument1, this.props, this.handlePriceUpdate, (subscription) => {
            console.log(subscription);
        });
    }
}

var batching = new Batching();

window.handleSubscribePricesBtnClick = batching.handleSubscribePricesBtnClick;



