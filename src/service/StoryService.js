import axios from 'axios';
import config from '../config/config';
import { Form } from 'redux-form';

export async function new_story(token,data)
{
    var formdata = new FormData();
    for(let item in data)
    {
        console.log(data[item]);
        formdata.append(item,data[item]);
    }
    return await axios.post(config.API_URL + "/content/create",formdata,{headers:{'Authorization':token,'Content-Type':'multipart/form-data'}});
}

export async function update_story(token,id,data)
{
    var formdata = new FormData();
    for(let item in data)
    {
        formdata.append(item,data[item]);
    }

    formdata.append('id',id);

    return await axios.patch(config.API_URL + "/content/create",formdata,{headers:{'Authorization': token}});
}

export async function getrecommended(token)
{
    return await axios.get(config.API_URL + "/content/get_recommended_books",{headers:{'Authorization':token}});
}

export async function getcategory(token)
{
    return await axios.get(config.API_URL + "/content/category/",{headers:{'Authorization':token}});
}

export async function getcontentcategory(category,token)
{
    return await axios.get(config.API_URL + "/content/get_content_category/",{params:{category:category},headers:{'Authorization':token}});
}

export async function get_content_by_id(token,id,read=0)
{
    return await axios.get(config.API_URL + "/content/get_content_by_id?contentid=" + id + '&read=' + read,{headers:{'Authorization':token}});
}

export async function get_continue_reading(token)
{
    return await axios.get(config.API_URL + "/content/",{headers:{'Authorization':'token ' + token},params:{'continue_reading':true}});
}

export async function get_content_search(search,category,token)
{
    return await axios.get(config.API_URL + "/content/search/",{headers:{'Authorization':token},params:{query:search,category:category}});
}

export async function get_content(token)
{
    return await axios.get(config.API_URL + "/content",{headers:{'Authorization':token}});
}

export async function get_draft_content(token)
{
    return await axios.get(config.API_URL + "/content/drafts/",{headers:{'Authorization':'token ' + token}});
}

export async function get_sold_content(token)
{
    console.log("token",token);
    return await axios.get(config.API_URL + "/content/sold/",{headers:{'Authorization': token}});
}

export async function get_publish_content(token)
{
    return await axios.get(config.API_URL + "/content/submissions/",{headers:{'Authorization':token}});
}

export async function get_purchase_content(token)
{
    return await axios.get(config.API_URL + "/content/get_purchase_content",{headers:{'Authorization':token}})
}

export async function add_wishlist(data)
{
    var formdata = new FormData();
    formdata.append('contentid',data.contentid);
    return await axios.post(config.API_URL + "/reader/add_wishlist",formdata,{headers:{'Authorization':data.token}});
}

export async function get_wishlist(token)
{
    return await axios.get(config.API_URL + "/reader/get_wishitem",{headers:{'Authorization':token}});
}

export async function delete_wishlist(wishlist,token)
{
    return await axios.delete(config.API_URL + "/reader/delete_wishlist/" + wishlist,{headers:{'Authorization':token}});
}

export async function read_book(contentid,token)
{
    return await axios.get(config.API_URL + "/content/read_content/" + contentid + '/',{headers:{'Authorization':token}});
}

export async function create_author_rating(token,data)
{
    return await axios.post(config.API_URL + "/rating/author/",data,{headers:{'Authorization':token}});
}

export async function get_author_rating(token)
{
    return await axios.get(config.API_URL + "/rating/author/",{headers:{'Authorization': token}});
}

export async function get_content_rating(token,contentid)
{
    return await axios.get(config.API_URL + "/rating/content/",{headers:{'Authorization': token},params:{contentid:contentid}});
}

export async function create_content_rating(token,data)
{
    var formdata = new FormData();
    for(let item in data)
    {
        formdata.append(item,data[item]);
    }

    return await axios.post(config.API_URL + "/rating/add_content_rating/",formdata,{headers:{'Authorization':token}});
}

export async function reader_rewards(token)
{
    return await axios.get(config.API_URL + "/reader/rewards_earned/",{headers:{'Authorization':token}})
}

export async function reader_rewards_burned(token)
{
    return await axios.get(config.API_URL + "/reader/rewards_burned/",{headers:{'Authorization': token}});
}

export async function reader_content_status(contentid,token)
{
    return await axios.put(config.API_URL + '/reader/reader_content_status/',{content_id:contentid,status:true},{headers:{'Authorization': token}})
}
export async function payment_for_request(data,token)
{
    var formdata = new FormData();
    for(let item in data)
    {
        formdata.append(item,data[item]);
    }
    return await axios.post(config.API_URL + "/content/payment",formdata,{headers:{'Authorization':token}})
}

export async function get_my_books(token)
{
    return await axios.get(config.API_URL + "/content/get_my_books",{headers:{'Authorization':token}});
}

export async function get_content_by_author(token,authorid)
{
    return await axios.get(config.API_URL + "/content/get_content_by_author",{headers:{'Authorization':token},params:{userid:authorid}});
}

export async function create_book_mark(token,data)
{
    var formdata = new FormData();
    for(let item in data)
    {
        formdata.append(item,data[item]);
    }

    return await axios.post(config.API_URL + "/content/create_book_mark",formdata,{headers:{'Authorization':token}});
}

export async function delete_bookmark(token,contentid,page)
{
    return await axios.get(config.API_URL + "/content/deletebookmark",{params:{contentid:contentid,page:page},headers:{'Authorization':token}});
}

export async function get_bookmark(token)
{
    return await axios.get(config.API_URL + "/content/get_book_mark/",{headers:{'Authorization':token}});
}

export async function get_free_books(token,id)
{
    return await axios.get(config.API_URL + "/content/get_free_books/",{headers:{'Authorization':token},params:{contentid:id}});
}

export async function get_rewards(token)
{
    return await axios.get(config.API_URL + "/content/get_rewards",{headers:{'Authorization':token}});
}

export async function get_draft_by_id(id,token)
{
    return await axios.get(config.API_URL + "/content/get_draft_by_id",{headers:{'Authorization':token},params:{contentid:id}});
}

export async function delete_content_by_id(id,token)
{
    var formdata = new FormData();
    formdata.append('contentid',id);
    return await axios.post(config.API_URL + "/content/delete_content_by_id",formdata,{headers:{'Authorization':token}});
}

export async function get_keyword_search(text)
{
    return await axios.get(config.API_URL + "/content/get_keywords",{params:{key:text}});
}

export async function add_keywords(text,token)
{
    var formdata = new FormData();
    formdata.append('keyword',text);
    return await axios.post(config.API_URL + "/content/add_keywords",formdata,{headers:{'Authorization':token}});
}

export async function get_keywords_foruser(token)
{
    return await axios.get(config.API_URL + "/content/get_keywords_for_user",{headers:{'Authorization':token}});
}

export async function delete_keywords(token,id)
{
    return await axios.get(config.API_URL + "/content/delete_keywords",{params:{id:id},headers:{'Authorization':token}});
}

export async function update_keywords(token,id,text)
{
    var formdata = new FormData();
    formdata.append('id',id);
    formdata.append('keyword',text);
    return await axios.post(config.API_URL + "/content/update_keywords",formdata,{headers:{'Authorization':token}});
}

export async function set_settlement(token,data)
{
    var formdata = new FormData();
    for(let item in data)
    {
        formdata.append(item,data[item]);
    }

    return await axios.post(config.API_URL + "/user/settlement",formdata,{headers:{'Authorization':token}});
}

export async function get_settlement(token)
{
    return await axios.get(config.API_URL + "/user/getsettlement",{headers:{'Authorization':token}});
}

export async function get_earned(token)
{
    return await axios.get(config.API_URL + "/user/getearned",{headers:{'Authorization':token}});
}

export async function get_content_by_keyword(data)
{
    return await axios.get(config.API_URL + "/content/search_content_with_keyword",{params:data,headers:{"Authorization":token}});
}

export async function get_download_content(token)
{
    return await axios.get(config.API_URL + "/content/download",{headers:{'Authorization':token}});
}

