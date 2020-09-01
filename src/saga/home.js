import {call,takeEvery,fork,all,put} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as HomeService from '../service/HomeService';
import * as StoryService from '../service/StoryService';
import * as UserService from '../service/UserService';
import {AsyncStorage} from 'react-native';

export function* init_home()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        let role = payload.role;
        try
        {
            const profile = yield call(UserService.getuserprofile,token);
            AsyncStorage.setItem("userinfo",JSON.stringify({token:token,role:role}));
            if(profile.data.success)
            {
                yield put({type:actiontype.SET_PROFILE,user:profile.data.data}); 
            }
            
            if(role == 'writer')
            {
                const home = yield call(HomeService.writer_home,token);
                if(home.data.success)
                {
                    yield put({type:actiontype.SET_HOME,home:home.data});
                }

                const content = yield call(StoryService.get_sold_content,token);
                if(content.data.success)
                {
                    yield put({type:actiontype.SOLD_CONTENT,data:content.data.data});
                }
            }
            else
            {
                const home = yield call(HomeService.reader_home,token);
                yield put({type:actiontype.SET_HOME,home:home.data});
            }
        }
        catch(e)
        {
            console.log('homeerror',e.response.data);
        }
        
    })
}

export function* new_story()
{
    yield takeEvery(actiontype.NEW_STORY_START,function*(payload){
        let token = payload.token;
        let data = payload.data;
        console.log(token);
        try
        {
            const res = yield call(StoryService.new_story,token,data);
            console.log(res.data.success);
            if(res.data.success)
            {
                const home = yield call(HomeService.writer_home,token);
                if(home.data.success)
                {
                    yield put({type:actiontype.SET_HOME,home:home.data});
                }
            }
            
            payload.next();
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
        fork(init_home),
        fork(new_story)
    ])
}