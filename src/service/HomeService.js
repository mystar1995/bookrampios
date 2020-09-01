import axios from 'axios';
import config from '../config/config';

export async function reader_home(token)
{
    return await axios.get(config.API_URL + "/reader/home/",{headers:{'Authorization':token}});
}

export async function writer_home(token)
{
    return await axios.get(config.API_URL + "/writer",{headers:{'Authorization':token}});
}

export async function get_config(token)
{
    return await axios.get(config.API_URL + "/content/config",{headers:{'Authorization':token}});
}