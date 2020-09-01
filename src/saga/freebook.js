import {call,takeEvery,fork,all,put} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';

export function* get_free_book()
{
    yield takeEvery(actiontype.SELECT_FREE_BOOKS,function*(payload){
        let token = payload.token;
        let id = payload.contentid;

        try
        {
            let result = yield call(StoryService.get_free_books,token,id);
            if(result.data.success)
            {
                yield put({type:actiontype.SET_FREE_BOOKS,data:result.data.data});
                payload.next();
            }
        }
        catch(e)
        {
            console.log(e);
        }
    })
}

export default function* rootSaga()
{
    yield all([
        fork(get_free_book)
    ])
}