import {call,takeEvery,fork,all,put} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as UserService from '../service/UserService';


export function* init_fan()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        let role = payload.role;

        try
        {
            if(role == 'writer')
            {
                const home = yield call(UserService.getfans,token);
                yield put({type:actiontype.GET_FANS,data:home.data});
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
        fork(init_fan)
    ])
}