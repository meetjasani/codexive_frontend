import { IS_DARK_MODE } from '../type';

const initialState = {
    is_dark: false,
};

export const darkModeReducer = (state = initialState, action: any) => {
    // console.log("reducers state",action.payload);
    switch (action.type) {
        case IS_DARK_MODE:
            return {
                ...state,
                is_dark: action.payload,
            };
        default:
            return state;
    }
};
