import * as actiontype from '../constant/action-type';

const initialstate = {
    content:[],
    reading:[],
    draft:[],
    published:[],
    sold:[],
    search:'',
    mycontent:[],
    recommended:[],
    purchase:[],
    draftcontent:{},
    keywords:[]
}

export default function(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.CONTENT_READING:
            return {...state,reading:action.data};
        case actiontype.CONTENT_SEARCH:
            return {...state,search:action.key};
        case actiontype.ALL_CONTENT:
            return {...state,content:action.data};
        case actiontype.SOLD_CONTENT:
            return {...state,sold:action.data};
        case actiontype.SUBMISSIONS:
            return {...state,published:action.data};
        case actiontype.DRAFT_CONTENT:
            return {...state,draft:action.data};
        case actiontype.MY_CONTENT:
            return {...state,mycontent:action.data};
        case actiontype.GET_PURCHASE:
            return {...state,purchase:action.data};
        case actiontype.RECOMMEND_BOOKS:
            return {...state,recommended:action.data};
        case actiontype.EDIT_DRAFT_CONTENT:
            return {...state,draftcontent:action.data};
        case actiontype.INIT_KEYWORDS:
            return {...state,keywords:action.data};
        default:
            return state;
    }
}