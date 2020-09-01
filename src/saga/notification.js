import {call,put,takeEvery,fork,all} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as Notification from '../service/NotificationService';

export function* init_notification()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        try
        {
            let res = yield call(Notification.getnotification,token);
            console.log('resdatasuccess',res.data);
            if(res.data.success)
            {
                yield put({type:actiontype.GET_NOTIFICATION,data:res.data.data});
            }
        }
        catch(e)
        {
            console.log('resdataerror',e);
        }
    })
}

export function* read_notification()
{
    yield takeEvery(actiontype.READ_NOTIFICATION,function*(payload){
        let id = payload.id;
        let token = payload.token;
        
        try
        {
            let res = yield call(Notification.readnotification,id,token);
            console.log('readsuccess',res.data);
            if(res.data.success)
            {
                yield put({type:actiontype.GET_NOTIFICATION,data:res.data.data});
            }
        }
        catch(e)
        {
            console.log('readerror',e);
        }
    })
}

export default function* rootSaga()
{
    yield all([
        fork(init_notification),
        fork(read_notification)
    ])
}