import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import { 
  GET_LATEST_NEWS, 
  GET_POPULAR_NEWS, 
  SET_LATEST_NEWS_ERROR, 
  SET_POPULAR_NEWS_ERROR,
  SET_LOADER } from '../constants';
import { setLatestNews, setPopularNews } from '../actions/actionCreator';
import { getLatestNews, getPopularNews } from '../../api/index';

export function* handleLatestNews() {
  try {
    yield put({type: SET_LOADER, payload: true})
    const { hits } = yield call(getLatestNews, 'react');
    yield put(setLatestNews(hits));
    yield put({type: SET_LOADER, payload: false})
  } catch {
    yield put({ type: SET_LATEST_NEWS_ERROR, payload: 'Error fetching latest news' });
  }
}

export function* handlePopularNews() {
  try {
    yield put({type: SET_LOADER, payload: true})
    const { hits } = yield call(getPopularNews);
    yield put(setPopularNews(hits));
    yield put({type: SET_LOADER, payload: false})
  } catch {
    yield put({ type: SET_POPULAR_NEWS_ERROR, payload: 'Error fetching popular news' });
  }
}

export function* watchPopularSaga() {
  yield takeEvery(GET_POPULAR_NEWS, handlePopularNews)
}

export function* watchLatestSaga() {
  yield takeEvery(GET_LATEST_NEWS, handleLatestNews)
}

export default function* rootSaga() {
  yield all([
    fork(watchPopularSaga),
    fork(watchLatestSaga)
  ]);
}
