import {takeEvery,put,call,all,fork} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';

export function* getcategory()
{
   yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        try
        {
            const res = yield call(StoryService.getcategory,payload.token);
            if(res.data.success)
            {
                yield put({type:actiontype.SET_CATEGORY,data:res.data.data});    
            }
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
        fork(getcategory)
    ])
}