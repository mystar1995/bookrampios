import {call,put,takeEvery,fork,all} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';
import * as UserService from '../service/UserService';

export function* init_reward()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        try
        {
            let rewards = yield call(StoryService.get_rewards,token);
            if(rewards.data.success)
            {
                
            }
        }
        catch(e)
        {

        }
    })
}

export function* earn_reward()
{
    yield takeEvery(actiontype.EARN_REWARDS,function*(payload){
        let token = payload.token;
        let page = payload.page;
        let contentid = payload.contentid;
        
        try
        {
            let result = yield call(UserService.earnrewards,contentid,page,token);
            
            if(result.data.success)
            {
                
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
        fork(init_reward),
        fork(earn_reward)
    ])
}