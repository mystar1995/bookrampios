import {call,put,takeEvery,fork,all} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';

export function* add_rating()
{
    yield takeEvery(actiontype.ADD_RATING,function*(payload){
        let token = payload.token;
        let data = payload.data;
        try
        {
            let result = yield call(StoryService.create_content_rating,token,data);
            payload.next();

            yield put({type:actiontype.INIT_RATING,content_id:data['content_id'],token:token});
        }
        catch(e)
        {
            console.log(e.response.data);
        }
    })
}

export function* init_rating()
{
    yield takeEvery(actiontype.INIT_RATING,function*(payload){
        let token = payload.token;
        let contentid = payload.contentid;
        
        try
        {
            let content = yield call(StoryService.get_content_by_id,token,contentid);
            let rating = yield call(StoryService.get_content_rating,token,contentid);
            console.log(rating.data);
            if(rating.data.success)
            {
                yield put({type:actiontype.SET_RATING,rating:rating.data.data,content:content.data.data});
                if(payload.next)
                {
                    payload.next();
                }
                
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
        fork(add_rating),
        fork(init_rating)
    ])
}