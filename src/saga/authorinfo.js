import {takeEvery,put,call,all,fork} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as UserService from '../service/UserService';
import * as StoryService from '../service/StoryService';

export function* authorinfo()
{
   yield takeEvery(actiontype.SELECT_AUTHORINFO,function*(payload){
        try
        {
            const res = yield call(UserService.getauthorinfo,payload.token,payload.authorid);
            console.log(res.data);
            if(res.data.success)
            {
                yield put({type:actiontype.SET_AUTHORINFO,data:res.data.author});    
            }

            const content = yield call(StoryService.get_content_by_author,payload.token,payload.authorid);
            console.log(content.data);
            if(content.data.success)
            {
                yield put({type:actiontype.SET_AUTHORCONTENT,data:content.data.data});
            }

            payload.next();
        }
        catch(e)
        {
           console.log('category',e);
        }
    })
}

export default function* rootSaga()
{
    yield all([
        fork(authorinfo)
    ])
}