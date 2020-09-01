import * as actiontype from '../constant/action-type';
const initialdata = [];

export default function wishlist(state = initialdata,action)
{
    switch(action.type)
    {
        case actiontype.SET_WISHLIST:
            return action.data;
        default:
            return state;
    }
}