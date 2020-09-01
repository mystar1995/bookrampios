import {call,put,takeEvery,fork,all} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';

export function* init_wishlist()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        try
        {
            let res = yield call(StoryService.get_wishlist,token);
            console.log(res.data);
            if(res.data.success)
            {
                yield put({type:actiontype.SET_WISHLIST,data:res.data.data});
            }
        }
        catch(e)
        {
            console.log(e);
        }
    })
}

export function* add_wishlist()
{
    yield takeEvery(actiontype.ADD_WISHLIST,function*(payload){
        let token = payload.token;
        let contentid = payload.contentid;
        try
        {
            let res = yield call(StoryService.add_wishlist,{token,contentid});
           
            let wishlist = yield call(StoryService.get_wishlist,token);

            console.log(wishlist.data);
            if(wishlist.data.success)
            {  
                yield put({type:actiontype.SET_WISHLIST,data:wishlist.data.data});
            }
        }   
        catch(e)
        {
            console.log(e);
        }
    })
}

export function* delete_wishlist()
{
    yield takeEvery(actiontype.DELETE_WISHLIST,function*(payload){
        let token = payload.token;
        let contentid = payload.contentid;
        try
        {
            let result = yield call(StoryService.delete_wishlist,contentid,token);
            console.log(result.data);
            if(result.data.success)
            {
                let wishlist = yield call(StoryService.get_wishlist,token);

                if(wishlist.data.success)
                {  
                    yield put({type:actiontype.SET_WISHLIST,data:wishlist.data.data});
                }
            }
        }
        catch(e)
        {   
            console.log(e.response.data);
        }
    })
}

export default function* rootSaga()
{
    yield all([
        fork(init_wishlist),
        fork(add_wishlist),
        fork(delete_wishlist)
    ])
}