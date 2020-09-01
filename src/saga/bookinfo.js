import {takeEvery,fork,all,call,put} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';

export function* select_book()
{
    yield takeEvery(actiontype.SELECT_BOOK_INFO,function*(payload){
        let token = payload.token;
        let id = payload.id;
        try
        {
            let content = yield call(StoryService.get_content_by_id,token,id);
            console.log('contentdata',content.data);
            if(content.data.success)
            {
                yield put({type:actiontype.BOOK_INFO,data:content.data.data});

                if(payload.next)
                {
                    payload.next();
                }
            }
        }
        catch(e)
        {
            console.log("homeerror",e.response);
        }
    })
}

export default function* rootSaga()
{
    yield all([
        fork(select_book)
    ])
}