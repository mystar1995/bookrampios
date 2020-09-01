import * as actiontype from '../constant/action-type';

const initialstate = [];

export default function(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.SET_CATEGORY:
            return action.data;
        default:
            return state;
    }
}