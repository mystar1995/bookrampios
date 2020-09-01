import * as actiontype from '../constant/action-type';

const initialstate = {};

export default function bookinfo(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.BOOK_INFO:
            return action.data;
        default:
            return state;
    }
}