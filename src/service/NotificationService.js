import config from '../config/config';
import axios from 'axios';

export async function getnotification(token)
{
    return await axios.get(config.API_URL + "/notification",{headers:{'Authorization':token}});
}

export async function readnotification(id,token)
{
    return await axios.get(config.API_URL + "/notification/read",{headers:{'Authorization':token},params:{notify_id:id}});
}