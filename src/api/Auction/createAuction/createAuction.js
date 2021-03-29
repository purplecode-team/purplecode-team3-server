const { withFilter } = require("graphql-subscriptions");
const {CHANNEL_NEW_AUCTION} = require("../../../Constants");

module.exports = {
    Subscription: {
        createAuction: {
            subscribe: withFilter(
                (_, __,{pubsub})=> pubsub.asyncIterator(CHANNEL_NEW_AUCTION),
                (payload, {idAuction }) => {
                    payload.idAuction == idAuction;
                    console.log("idProduct issss ",idAuction);
                    console.log("payload issss", payload);
                }
            ),
            resolve : (payload) => {
                return payload.createAuction
            }
        },
    }
};