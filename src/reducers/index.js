import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');

const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
    secondAction,
    tempNavState,
);

function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case 'Login':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Main' }),
                state
            );
            break;
        case 'Logout':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Login' }),
                state
            );
            break;
        case 'SignUp':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'SignUp' }),
                state
            );
            break;
        case 'ForgotPassword':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'ForgotPassword' }),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

const initialAuthState = { isLoggedIn: false, user: null, error: null };

function auth(state = initialAuthState, action) {
    switch (action.type) {
        case 'Login':
            return { ...state, isLoggedIn: true, user: action.payload.user };
        case 'Logout':
            return { ...state, isLoggedIn: false, user: null };
        case 'USER_FETCH_FAILED':
            return { ...state, error: { message: action.message }};
        default:
            return state;
    }
}


const AppReducer = combineReducers({
    nav,
    auth,
    form: formReducer
});

export default AppReducer;