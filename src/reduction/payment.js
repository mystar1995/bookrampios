import * as actiontype from '../constant/action-type';

const initialstate = {};

export default function payment(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.CREATE_PAYMENT:
            return action.data;
        default:
            return state;
    }
}

