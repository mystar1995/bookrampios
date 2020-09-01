import * as actiontype from '../constant/action-type';

const initialstate = [];

export default function bookmark(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.SET_BOOK_MARK:
            return action.data;
        default:
            return state;
    }
}

