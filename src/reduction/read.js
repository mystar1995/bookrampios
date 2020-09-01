import * as actiontype from '../constant/action-type';

const initialstate = {};

export default function read(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.READ_BOOK:
            return action.data;
        default:
            return state;
    }
}