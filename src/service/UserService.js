import axios from 'axios';
import config from '../config/config';

export async function signuprequest(data)
{
    var formdata = new FormData();

    for(let item in data)
    {
        formdata.append(item,data[item]);
    }
    return await axios.post(config.API_URL + "/user/register/",formdata,{headers:{'Content-Type':'multipart/form-data'}});
}

export async function valid_user(token)
{
    return await axios.post(config.API_URL + "/user/valid_user",{},{headers:{'Authorization':token}});
}

export async function loginrequest(data)
{
    var formdata = new FormData();
    for(let item in data)
    {
        formdata.append(item,data[item]);
    }
    
    return await axios.post(config.API_URL + "/user/login/",formdata,{headers:{'Content-Type':'multipart/form-data'}});
}

export async function logoutrequest(token)
{
    return await axios.post(config.API_URL + "/user/logout/",{},{headers:{'Authorization':token}});
}

export async function getuserprofile(token)
{
    return await axios.get(config.API_URL + "/user/profile/",{headers:{'Authorization': token}});
}

export async function updateuserprofile(profile,token)
{
    var formdata = new FormData();
    for(let item in profile)
    {
        formdata.append(item,profile[item]);
    }

    return await axios.post(config.API_URL + "/user/update_profile/",formdata,{headers:{'Authorization':token,'Content-Type':'multipart/form-data'}});
}

export async function getfans(token)
{
    return await axios.get(config.API_URL + "/author/fans/",{headers:{"Authorization":"token " + token}});
}

export async function getauthorinfo(token,authorid)
{
    return await axios.get(config.API_URL + "/user/authorinfo/",{headers:{'Authorization':token},params:{authorid:authorid}});
}

export async function verify_otp(data)
{
    return await axios.post(config.API_URL + "/user/verify_otp/",data);
}

export async function forget_password_request(phone)
{
    console.log(phone);
    var formdata = new FormData();
    formdata.append('phone_number',phone);
    return await axios.post(config.API_URL + "/user/forget_password/",formdata);
}

export async function forget_password_reset(data)
{
    var formdata = new FormData();
    for(let item in data)
    {
        formdata.append(item,data[item]);
    }
    return await axios.post(config.API_URL + "/user/reset_password/",formdata);
}

export async function forget_password_reset_after(data,token)
{
    return await axios.post(config.API_URL + "/user/change_pwd/",data,{headers:{"Authorization":"token " + token}});
}   

export async function update_user_language(lang,token)
{
    return await axios.patch(config.API_URL + "/user/update_preferred_language/",{language:lang},{headers:{"Authorization":"token " + token}});
}

export async function get_friends(token)
{
    return await axios.get(config.API_URL + "/author/friends/",{headers:{'Authorization':'token ' + token}});
}

export async function add_friends(email)
{
    return await axios.post(config.API_URL + "/author/friends/",{email:email},{headers:{'Authorization':'token ' + token}})
}

export async function get_app_friends(token)
{
    return await axios.get(config.API_URL + "/author/app_friends/",{headers:{'Authorization':'token ' + token}});
}

export async function get_other_friends(token)
{
    return await axios.get(config.API_URL + "/author/other_friends/",{headers:{'Authorization':'token ' + token}});
}

export async function verify(phonenumber,verify)
{
    console.log(phonenumber);
    var formdata = new FormData();
    formdata.append("phone_number",phonenumber);
    formdata.append("verify",verify);
    return await axios.post(config.API_URL + "/user/verify_user",formdata);
}

export async function forget_password(phone_number)
{
    var formdata = new FormData();
    formdata.append('phone_number',phone_number);
    return await axios.post(config.API_URL + "/user/forget_password",formdata);
}

export async function resetpassword(data)
{
    var formdata = new FormData();
    for(let item in data)
    {
        formdata.append(item,data[item]);
    }

    return await axios.post(config.API_URL + "/user/reset_password",formdata);
}

export async function buyrewards(rewards,token)
{
    var formdata = new FormData();
    formdata.append("rewards",rewards);
    return await axios.post(config.API_URL + "/user/buy_rewards",formdata,{'Authorization':token});
}

export async function setlang(lang,token)
{
    var formdata = new FormData();
    formdata.append("lang",lang);
    return await axios.post(config.API_URL + "/user/setlang",formdata,{headers:{'Authorization':token}});
}

export async function earnrewards(contentid,page,token)
{
    var formdata = new FormData();
    formdata.append('contentid',contentid);
    formdata.append('page',page);

    return await axios.post(config.API_URL + "/user/earn_reward",formdata,{headers:{'Authorization':token}});
}

export async function get_fanlist(token)
{
    return await axios.get(config.API_URL + "/reader/get_fanlist",{headers:{'Authorization':token}});
}
