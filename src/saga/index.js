import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import axios from 'axios';

const login = (values) => () => axios.post('https://apistaging.trucknet.io/api/v1/login', { email: values.email, password: values.password });
const fetchUser = (userId) => () => axios.get(`https://apistaging.trucknet.io/api/v1/users/${userId}`);

export function* fetchUserInfo(action) {

    try {
        const values  = action.payload;
        const res = yield call(login(values));

        const userData = res.data
        const user = yield call(fetchUser(userData.data._id));
        
        yield put({type: 'Login', payload: {user: user.data}});
    } catch (e) {
        console.log(e);
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

function* mySaga() {
    yield [
        takeEvery("Login_async", fetchUserInfo),
    ];
}

export default mySaga;