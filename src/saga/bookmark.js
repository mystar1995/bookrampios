import {takeEvery,fork,all,call,put} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';

export function* init_bookmark()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        try
        {
            let bookmark = yield call(StoryService.get_bookmark,token);
            console.log('bookmark',bookmark.data);
            if(bookmark.data.success)
            {
                yield put({type:actiontype.SET_BOOK_MARK,data:bookmark.data.data});
            }
        }
        catch(e)
        {

        }
    })
}

export function* create_book_mark()
{
    yield takeEvery(actiontype.SELECT_BOOK_MARK,function*(payload){
        let token = payload.token;
        let data = payload.data;
        try
        {
            let res = yield call(StoryService.create_book_mark,token,data);
            console.log(res.data);
            if(res.data.success)
            {
                let bookmark = yield call(StoryService.get_bookmark,token);
                console.log('bookmark',bookmark.data);
                if(bookmark.data.success)
                {
                    yield put({type:actiontype.SET_BOOK_MARK,data:bookmark.data.data});
                }
                payload.next();
            }
        }
        catch(e)
        {
            console.log(e);
        }
    })
}

export function* delete_bookmark()
{
    yield takeEvery(actiontype.DELETE_BOOK_MARK,function*(payload){
        let token = payload.token;
        let contentid = payload.contentid;
        let page = payload.page;
        try
        {
            let result = yield call(StoryService.delete_bookmark,token,contentid,page);

            if(result.data.success)
            {
                let bookmark = yield call(StoryService.get_bookmark,token);
                if(bookmark.data.success)
                {
                    yield put({type:actiontype.SET_BOOK_MARK,data:bookmark.data.data});
                }
            }
        }
        catch(e)
        {

        }
    })
}

export default function* rootSaga()
{
    yield all([
        fork(create_book_mark),
        fork(init_bookmark),
        fork(delete_bookmark)
    ]);
}