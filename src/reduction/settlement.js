import * as actiontype from '../constant/action-type';

const initialstate = {
    earned:[],
    settled:[]
}

export default function settlement(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.SET_SETTLEMENT:
            return {...state,settled:action.data};
        case actiontype.SET_EARNED:
            return {...state,earned:action.data};
        default:
            return state;
    }
}