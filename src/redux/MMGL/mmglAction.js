export const LOAD_MARKETPLACE = 'LOAD_MARKETPLACE';
export const LOAD_MERCHANT = 'LOAD_MERCHANT';
export const LOAD_GL = 'LOAD_GL';

export const loadMarketplace = (value) => (dispatch) => {
    console.log("Inside loadMP");
    console.log(value);
    dispatch({type: LOAD_MARKETPLACE, value});
};

export const loadMerchant = (value) => (dispatch) => {
    dispatch({type: LOAD_MERCHANT, value});
};

export const loadGl = (value) => (dispatch) => {
    dispatch({type: LOAD_GL, value});
};