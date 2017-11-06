import '../libs/jquery-3.1.1';
import 'signalr';

import saxo from "openapi-clientlib";

let transport;
let streaming;
let prevTokenState = '';

function getStreamingObj(authToken = 'default_token') {
    if (!streaming || prevTokenState !== authToken) {
        streaming = new saxo.openapi.Streaming(getTransportAuth(authToken), streamingUrl, { getToken: () => authToken });
        prevTokenState = authToken;
    }
    return streaming;
}

function subscribe(params, onUpdate, onError) {
    const subscription = getStreamingObj(params.accessToken)
    .createSubscription(params.serviceGroup, params.endPoint, params.queryParams, onUpdate, onError);
    subscriptions.push(subscription);
    return subscription;
}

export function subscribePrices(accessToken, instrumentData, onUpdate, onError) {
    return new Promise(function (resolve) {
        const subscription = subscribe({
            serviceGroup: 'trade',
            endPoint: 'v1/Prices/subscriptions',
            queryParams: {
                Arguments: {
                    AssetType: instrumentData.AssetType,
                    Uic: instrumentData.Uic,
                    FieldGroups: [
                        'Commissions',
                        'DisplayAndFormat',
                        'Greeks',
                        'InstrumentPriceDetails',
                        'MarginImpact',
                        'MarketDepth',
                        'PriceInfo',
                        'PriceInfoDetails',
                        'Quote',
                    ],
                },
                RefreshRate: 5,
            },
            accessToken,
        }, onUpdate, onError);
        resolve(subscription);
    });
}