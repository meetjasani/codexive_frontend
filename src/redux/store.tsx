import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { toggleMenuReducer } from './reducers/toggleMenuReducer';
import { darkModeReducer } from './reducers/darkModeReducer';

const middleware = [thunk];

const rootReducer = combineReducers({
    menuToggle: toggleMenuReducer,
    darkMode: darkModeReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
