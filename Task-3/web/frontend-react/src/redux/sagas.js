// @flow
import { all } from 'redux-saga/effects';
import appMenuSaga from './appMenu/saga';

export default function* rootSaga(getState){
    yield all([appMenuSaga()]);
}
