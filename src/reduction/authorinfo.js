import * as actiontype from '../constant/action-type';

const initialstate = {
    maininfo:{},
    content:[]
}

export default function authorinfo(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.SET_AUTHORINFO:
            return {...state,maininfo:action.data};
        case actiontype.SET_AUTHORCONTENT:
            return {...state,content:action.data};
        default:
            return state;
    }
}