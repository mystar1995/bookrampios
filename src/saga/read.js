import {call,put,takeEvery,fork,all, delay} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';
import * as UserService from '../service/UserService';

export function* select_book()
{
    yield takeEvery(actiontype.SELECT_BOOK,function*(payload){
        let token = payload.token;
        let id = payload.id;
        try
        {
            let content = yield call(StoryService.get_content_by_id,token,id,1);
            if(content.data.success)
            {
                console.log("page",payload.page);
                if(payload.page)
                {
                    content.data.data['page'] = payload.page;
                }

                yield put({type:actiontype.READ_BOOK,data:content.data.data});
                
                const purchase = yield call(StoryService.get_purchase_content,token);
                if(purchase.data.success)
                {
                    yield put({type:actiontype.GET_PURCHASE,data:purchase.data.data});
                }

                yield put({type:actiontype.INIT_RATING,contentid:id,token:token});
                payload.next();
                
                
                // let res = yield call(StoryService.get_rewards,token);
                // if(res.data.success)
                // {
                //     yield put({type:actiontype.SET_REWARDS,data:res.data.data});
                // }
                
               
            }

            // let res = yield call(UserService.getuserprofile,token);
            // if(res.data.success)
            // {
            //     yield put({type:actiontype.SET_PROFILE,user:res.data.data});
            // }
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
        fork(select_book)
    ]);
}