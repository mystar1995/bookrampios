import {call,put,takeEvery,fork,all} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';

export function* add_settlement()
{
    yield takeEvery(actiontype.ADD_SETTLEMENT,function*(payload){
        let token = payload.token;
        let data = payload.data;
        try
        {
            let result = yield call(StoryService.set_settlement,token,data);

            console.log(result.data);

            payload.next(result.data);
            if(result.data.success)
            {
                result = yield call(StoryService.get_settlement,token);
                if(result.data.success)
                {
                    yield put({type:actiontype.SET_SETTLEMENT,data:result.data.data});
                }
            }
            
        }
        catch(e)
        {
            console.log(e.response.data);
        }
    })
}

export function* get_settlement()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        try
        {
            let result = yield call(StoryService.get_settlement,token);
            if(result.data.success)
            {
                console.log("settlement",result.data.data);   
                yield put({type:actiontype.SET_SETTLEMENT,data:result.data.data});
            }

            result = yield call(StoryService.get_earned,token);
            console.log('earned',result);
            if(result.data.success)
            {
                yield put({type:actiontype.SET_EARNED,data:result.data.data});
            }
        }
        catch(e)
        {
            console.log('settlementearned',e.response.data);
        }
    })
}

export default function* rootSaga()
{
    yield all([
        fork(add_settlement),
        fork(get_settlement)
    ])
}