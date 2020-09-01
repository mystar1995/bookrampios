import {takeEvery,fork,all,call,put,delay} from 'redux-saga/effects';
import * as actiontype from '../constant/action-type';
import * as StoryService from '../service/StoryService';
import * as HomeService from '../service/HomeService';
import {AsyncStorage} from 'react-native';

export function* getcontent()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        try
        {
            const content = yield call(StoryService.get_content,token);
            if(content.data.success)
            {
                yield put({type:actiontype.ALL_CONTENT,data:content.data.data});
            }
            const mycontent = yield call(StoryService.get_my_books,token);
            if(mycontent.data.success)
            {
                yield put({type:actiontype.MY_CONTENT,data:mycontent.data.data});
            }

            const purchase = yield call(StoryService.get_purchase_content,token);
            if(purchase.data.success)
            {
                yield put({type:actiontype.GET_PURCHASE,data:purchase.data.data});
            }
        }
        catch(e)
        {
            console.log('content',e);
        }
    })
}

export function* select_draft_content()
{
    yield takeEvery(actiontype.SELECT_DRAFT_CONTENT,function*(payload){
        let token = payload.token;
        let contentid = payload.contentid;

        try{
            let content = yield call(StoryService.get_draft_by_id,contentid,token);
            if(content.data.success)
            {
                console.log("draftcontent",content.data.data);
                yield put({type:actiontype.EDIT_DRAFT_CONTENT,data:content.data.data});
                payload.next(content.data.data.content_file);
            }
        }
        catch(e)
        {

        }
    })
}

export function* delete_content()
{
    yield takeEvery(actiontype.DELETE_CONTENT,function*(payload){
        let token = payload.token;
        let contentid = payload.contentid;

        try
        {
            let content = yield call(StoryService.delete_content_by_id,contentid,token);
            if(content.data.success)
            {
                let home = yield call(HomeService.writer_home,token);
                console.log("homedata",home.data);
                if(home.data.success)
                {
                    yield put({type:actiontype.SET_HOME,home:home.data});
                }
            }
        }
        catch(e)
        {
            console.log(e);
        }
    })
}

export function* add_keywords()
{
    yield takeEvery(actiontype.ADD_KEYWORDS,function*(payload){
        let token = payload.token;
        let text = payload.text;
        try
        {   
            let result = yield call(StoryService.add_keywords,text,token);

            console.log(result.data);
            if(result.data.success)
            {
                let result = yield call(StoryService.get_keywords_foruser,token);
                if(result.data.success)
                {
                    yield put({type:actiontype.INIT_KEYWORDS,data:result.data.data});
                }
            }
        }
        catch(e)
        {
            console.log(e.response.data);
        }
    })
}

export function* init_keywords()
{
    yield takeEvery(actiontype.AITH_SUCCESS,function*(payload){
        let token = payload.token;
        try
        {
            let result = yield call(StoryService.get_keywords_foruser,token);
            if(result.data.success)
            {
                yield put({type:actiontype.INIT_KEYWORDS,data:result.data.data});
            }
        }
        catch(e)
        {

        }
    })
}

export function* delete_keywords()
{
    yield takeEvery(actiontype.DELETE_KEYWORDS,function*(payload){
        let token = payload.token;
        let id = payload.id;
        try
        {
            let result = yield call(StoryService.delete_keywords,token,id);
            if(result.data.success)
            {
                let result = yield call(StoryService.get_keywords_foruser,token);
                if(result.data.success)
                {
                    yield put({type:actiontype.INIT_KEYWORDS,data:result.data.data});
                }
            }
        }
        catch(e)
        {
            console.log(e.response.data);
        }
    })
}

export function* update_keywords()
{
    yield takeEvery(actiontype.UPDATE_KEYWORDS,function*(payload){
        try
        {
            let token = payload.token;
            let id = payload.id;
            let text = payload.text;

            let result = yield call(StoryService.update_keywords,token,id,text);
            if(result.data.success)
            {
                let result = yield call(StoryService.get_keywords_foruser,token);
                console.log(result.data);
                if(result.data.success)
                {
                    yield put({type:actiontype.INIT_KEYWORDS,data:result.data.data});
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
        fork(getcontent),
        fork(select_draft_content),
        fork(delete_content),
        fork(add_keywords),
        fork(delete_keywords),
        fork(update_keywords),
        fork(init_keywords)
    ]);
}