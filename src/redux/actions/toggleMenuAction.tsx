
import { IS_TOGGLE_MENU, IS_DARK_MODE } from '../type';

// export const setToggleMenu = (value) => (dispatch) => {
//   dispatch({
//     type: IS_TOGGLE_MENU,
//     payload: value,
//   });
// };

export const setToggleMenu = (value: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: IS_TOGGLE_MENU,
      payload: value,
    });

  } catch (error) {


    dispatch({
      type: IS_TOGGLE_MENU,
      payload: false
    });
  }
};



export const setReduxDarkMode = (value: any) => async (dispatch: any) => {
  dispatch({
    type: IS_DARK_MODE,
    payload: value,
  });
};