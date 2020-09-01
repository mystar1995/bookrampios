import {takeEvery,fork,all,call,put} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as UserService from '../service/UserService';
import {AsyncStorage} from 'react-native';
import * as StoryService from '../service/StoryService';

export function* signuprequest()
{
    yield takeEvery(actiontype.SIGNUP_START,function*(payload){
        try
        {
            console.log("payload",payload.user);
            const response = yield call(UserService.signuprequest,payload.user);
            console.log(response.data);
            if(response.data.error)
            {
                yield put({type:actiontype.SIGNUP_ERROR,error:response.data.error});
                console.log('error',response.data.error);
            }
            else
            {
                yield put({type:actiontype.SIGNUP_SUCCESS});
                yield put({type:actiontype.Phone_Verify,phone:payload.user.phone_number});
                payload.login();
            }

        }
        catch(e)
        {
            console.log(e.response.data);
            yield put({type:actiontype.SIGNUP_ERROR,error:e.response.data});
        }
        
    })
}

export function* init_auth()
{
    const userinfo = yield call(AsyncStorage.getItem,"userinfo");
    console.log("userinfo",userinfo);
    if(userinfo)
    {
        try
        {
            let user = JSON.parse(userinfo);
            console.log(user);
            let result = yield call(UserService.valid_user,user.token);
            console.log(result.data);
            if(result.data.success)
            {
                yield put({type:actiontype.AITH_SUCCESS,token:user.token,role:user.role});   
            }
        }
        catch(e)
        {
            console.log(e);
        }
        
    }
    
}

export function* update_lang()
{
    yield takeEvery(actiontype.SET_LANG,function*(payload){
        try
        {
            let token = payload.token;
            let lang = payload.lang;
            
            let result = yield call(UserService.setlang,lang,token);

            if(result.data.success)
            {
                let user = yield call(UserService.getuserprofile,token);
                if(user.data.success)
                {
                    yield put({type:actiontype.SET_PROFILE,user:user.data.data});
                }
            }
        }
        catch(e)
        {

        }
    })
}

export function* logoutrequest()
{
    yield takeEvery(actiontype.AUTH_LOGOUT,function*(payload){
        try
        {
            let token = payload.token;
            console.log("logout",token);
            let res = yield call(UserService.logoutrequest,token);
            payload.logout();
            yield put({type:actiontype.AUTH_LOGOUT_SUCCESS});   
            AsyncStorage.setItem("userinfo","");
        }
        catch(e)
        {
            console.log('logouterror',e);
            AsyncStorage.setItem("userinfo","");
            yield put({type:actiontype.AUTH_LOGOUT_SUCCESS});   
            payload.logout();
        }
        
    })
}

export function* signinrequest()
{
    yield takeEvery(actiontype.AUTH_START,function*(payload){
        try{
            const response = yield call(UserService.loginrequest,payload.user);
            console.log(response.data);
            if(response.data.success)
            {
                yield put({type:actiontype.AITH_SUCCESS,token:response.data.token,role:response.data.usertype});
                payload.login(response.data.usertype);
            }
            else
            {
                yield put({type:actiontype.AUTH_ERROR,error:response.data.error});
                if(response.data.error)
                {
                    payload.error(response.data.error);
                }
                else if(response.data.phone)
                {
                    yield put({type:actiontype.Phone_Verify,phone:response.data.phone});
                    payload.verify(response.data.phone);
                }
            }
        }
        catch(e)
        {
            console.log(e.response.data);
            yield put({type:actiontype.AUTH_ERROR,error:e.response.data});
            if(e.response.data.error)
            {
                payload.error(e.response.data.error.login_error);
            }
        }
        
    })
}

export function* verify_user()
{
    yield takeEvery(actiontype.Verify_User,function*(payload){
        try
        {
            let phone_number = payload.phone_number;
            let verify = payload.verify;
            console.log(phone_number);
            const response = yield call(UserService.verify,phone_number,verify);
            if(response.data.success)
            {
                yield put({type:actiontype.AITH_SUCCESS,token:response.data.token,role:response.data.usertype});
                AsyncStorage.setItem("userinfo",JSON.stringify({token:response.data.token,role:response.data.usertype}));
            }
            payload.next(response.data);
        }
        catch(e)
        {
            console.log(e);
        }
    })
}

export function* forgetpassword()
{
    yield takeEvery(actiontype.FORGET_PASSWORD,function*(payload){
        try
        {
            let phone = payload.phone_number;
            console.log(phone);
            const res = yield call(UserService.forget_password_request,phone);
            console.log(res.data);
            payload.next(res.data);
        }
        catch(e)
        {
            console.log(e);
        }
    })
}

export function* resetpassword()
{
    yield takeEvery(actiontype.RESET_PASSWORD,function*(payload){
        let data = payload.data;
        const result = yield call(UserService.resetpassword,data);
        if(result.data.success)
        {
            yield put({type:actiontype.AITH_SUCCESS,token:result.data.token,role:result.data.usertype});
            AsyncStorage.setItem("userinfo",JSON.stringify({token:result.data.token,role:result.data.usertype}));
        }
        payload.next(result.data);
    })
}

export function* getprofileforreward()
{
    yield takeEvery(actiontype.BURNED_REWARD,function*(payload){
        let token = payload.token;
        try
        {
            let profile = yield call(UserService.getuserprofile,token);
            if(profile.data.success)
            {
                yield put({type:actiontype.SET_PROFILE,user:profile.data.data}); 
            }
        }
        catch(e)
        {

        }
    })
}

export function* updateuserprofile()
{
    yield takeEvery(actiontype.UPDATE_PROFILE,function*(payload){
        try{
            let token = payload.token;
            const res = yield call(UserService.updateuserprofile,payload.data,token);
            console.log(res.data);
            if(res.data.success)
            {
                yield put({type:actiontype.SET_PROFILE,user:res.data.data});
                payload.updateprofile(res.data.data);
            }
        }
        catch(e)
        {
            console.log(e);
        }
    })
}

export function* init_reward()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        try
        {
            let rewards = yield call(StoryService.get_rewards,token);
            console.log('rrr',rewards.data);
            if(rewards.data.success)
            {
                yield put({type:actiontype.SET_REWARDS,data:rewards.data.data});
            }
        }
        catch(e)
        {
            
        }
    })
}

export function* buyrewards()
{
    yield takeEvery(actiontype.BUY_REWARDS,function*(payload){
        let token = payload.token;
        try{    
            let rewards = payload.rewards;
            let result = yield call(UserService.buyrewards,rewards,token);
            if(result.data.success)
            {
                yield put({type:actiontype.SET_PROFILE,user:result.data.data});
            }
        }
        catch(e)
        {

        }
    })
}

export function* earn_rewards()
{
    yield takeEvery(actiontype.EARN_REWARDS,function*(payload){
        let token = payload.token;
        let page = payload.page;
        let contentid = payload.contentid;

        try
        {
            let result = yield call(UserService.earnrewards,contentid,page,token);
            console.log('resultrewards',result.data);
            if(result.data.success)
            {
                yield put({type:actiontype.SET_REWARDS,data:result.data.data});

                let profile = yield call(UserService.getuserprofile,token);

                if(profile.data.success)
                {
                    yield put({type:actiontype.SET_PROFILE,user:profile.data.data});
                }
            }
        }
        catch(e)
        {
            console.log(e.response.data);
        }
    })
}

export function* get_fanlist()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        
        try
        {
            let result = yield call(UserService.get_fanlist,token);
            console.log('fans',result.data.data);
            if(result.data.success)
            {
                yield put({type:actiontype.GET_FANS,data:result.data.data});
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
        fork(init_auth),
        fork(signuprequest),
        fork(signinrequest),
        fork(logoutrequest),
        fork(updateuserprofile),
        fork(forgetpassword),
        fork(resetpassword),
        fork(verify_user),
        fork(init_reward),
        fork(update_lang),
        fork(earn_rewards),
        fork(get_fanlist)
    ])
}