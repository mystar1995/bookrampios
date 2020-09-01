import * as actiontype from '../constant/action-type';

const initialstate = {

}

export default function freebook(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.SET_FREE_BOOKS:
            return action.data;
        default:
            return state;
    }
}