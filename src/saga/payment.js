import {takeEvery,fork,all,call,put} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';

export function* select_payment()
{
    yield takeEvery(actiontype.SELECT_PAYMENT,function*(payload){
        let contentid = payload.contentid;
        let token = payload.token;
        console.log(contentid);
        try
        {
            let content = yield call(StoryService.get_content_by_id,token,contentid);
            console.log(content.data);
            if(content.data.success)
            {
                yield put({type:actiontype.CREATE_PAYMENT,data:content.data.data});
                payload.nextaction();
            }
        }
        catch(e)
        {
            console.log(e);
        }
    })
}

export function* send_payment()
{
    yield takeEvery(actiontype.SEND_PAYMENT,function*(payload){
        let data = payload.data;
        let token = payload.token;
        try
        {
            let result = yield call(StoryService.payment_for_request,data,token);
        
            if(data.rewards && result.data.success)
            {
                yield put({type:actiontype.BURNED_REWARD,token:token});
            }
        }
        catch(e)
        {
            console.log('send',e);
        }
        
    })
}

export default function* rootSaga()
{
    yield all([
        fork(select_payment),
        fork(send_payment)
    ])
}