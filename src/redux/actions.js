export const getCoins = (skip, callback) => {
    return (dispatch) => {
        const URL = "https://api.coinstats.app/public/v1/coins?limit=20&skip=" + skip;
        fetch(URL)
            .then(response => response.json())
            .then(responseJson => {
                dispatch(
                    { type: "getCoins", payload: responseJson.coins })
                callback(responseJson.coins);
            })
            .catch(err =>
                console.log(err))
    }
};

