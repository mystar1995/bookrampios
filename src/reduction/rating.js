import * as actiontype from '../constant/action-type';

const initialstate = {content:{},rating:[]}

export default function rating(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.SET_RATING:
            return {content:action.content,rating:action.rating};
        default:
            return state;
    }
}