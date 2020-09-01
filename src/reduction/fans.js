import * as actiontype from '../constant/action-type';

const initialstate = {
    fans:[]
}

export default function(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.GET_FANS:
            return {...state,fans:action.data};
        default:
            return state;
    }
}