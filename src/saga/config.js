import {takeEvery,fork,all,call,put,delay} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as HomeService from '../service/HomeService';

export function* init_config()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        try
        {
            let config = yield call(HomeService.get_config,token);
            if(config.data.success)
            {
                console.log('configdata',config.data.data)
                yield put({type:actiontype.UPDATE_CONFIG,data:config.data.data});
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
        fork(init_config)
    ])
}