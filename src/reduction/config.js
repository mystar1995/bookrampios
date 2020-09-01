import * as actiontype from '../constant/action-type';

const initialstate = {};

export default function config(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.UPDATE_CONFIG:
            return action.data;
        default:
            return state;
    }
}