import '../libs/jquery-3.1.1';
import 'signalr';

import saxo from "openapi-clientlib";

let transport;
let streaming;
let prevTokenState = '';


const transportUrl = 'https://gateway.saxobank.com/sim/openapi';

export function getUserDetails(accessToken) {
    return getData({
        serviceGroup: 'port',
        endPoint: 'v1/users/me',
        accessToken,
    });
}

export function getTransportAuth(authToken = 'default_token') {
    if (!transport || prevTokenState !== authToken) {
        transport = new saxo.openapi.TransportAuth(transportUrl, { token: authToken });
        prevTokenState = authToken;
    }
    return transport;
}

function getTransportBatch(accessToken, baseUrl) {

    const transportAuth = getTransportAuth(accessToken);
    const transportBatch = new openapi.TransportBatch(transportAuth, baseUrl, transportAuth.auth);
    // const queuedTransport = new saxo.openapi.TransportQueue(transportBatch, transportAuth);
    // openApi.rest = new HeaderRemovalTransport(queuedTransport);
    // transportBatch.runBatches();
    return transportBatch;
}

export function getData(params) {
    return getTransportAuth(params.accessToken).get(params.serviceGroup, params.endPoint, null, {
        queryParams: params.queryParams,
    });
}

function getStreamingObj(authToken = 'default_token') {
    if (!streaming || prevTokenState !== authToken) {
        streaming = new saxo.openapi.Streaming(getTransportAuth(authToken), streamingUrl, { getToken: () => authToken });
        prevTokenState = authToken;
    }
    return streaming;
}

function getBatchStreamingObj(authToken = 'default_token', baseUrl='') {
    if (!streaming || prevTokenState !== authToken) {
        streaming = new saxo.openapi.Streaming(getTransportBatch(authToken, baseUrl), streamingUrl, { getToken: () => authToken });
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

function subscribeBatches(params, onUpdate, onError) {
    const subscription = getStreamingObj(params.accessToken, params.endPoint)
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

export function subscribePricesBatch(accessToken, instrumentData, onUpdate, onError) {
    return new Promise(function (resolve) {
        const subscription = subscribeBatches({
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