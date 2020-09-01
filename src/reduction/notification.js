import * as actiontype from '../constant/action-type';

const initialdata = [];

export default function notification(state = initialdata,action)
{
    switch(action.type)
    {
        case actiontype.GET_NOTIFICATION:
            return action.data;
        default:
            return state;
    }
}