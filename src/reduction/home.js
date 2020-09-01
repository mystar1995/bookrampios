import * as actiontype from '../constant/action-type';
const initialdata = {
  
};

export default function home(state = initialdata,action)
{
    switch(action.type)
    {
        case actiontype.SET_HOME:
            return action.home;
        case actiontype.NEW_STORY:
            return {...state,draft:action.data};
        default:
            return state;
    }
}