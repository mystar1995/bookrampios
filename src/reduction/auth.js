import * as actiontype from '../constant/action-type';

const initialstate = {
    islogin:false,
    isregistered:false,
    user:{},
    token:'',
    loading:false,
    erorr:[],
    role:'',
    forget:{
        
    },
    verify_phone:'',
    fans:[]
}


export default function auth(state = initialstate,action)
{
    switch(action.type)
    {
        case actiontype.SIGNUP_START:
            return {...state,loading:true};
        case actiontype.SIGNUP_SUCCESS:
            return {...state,isregistered:true,error:[],loading:false};
        case actiontype.SIGNUP_ERROR:
            return {...state,error:action.error,loading:false};
        case actiontype.AUTH_START:
            return {...state,loading:true};
        case actiontype.AITH_SUCCESS:
            return {...state,islogin:true,error:[],loading:false,token:action.token,role:action.role};
        case actiontype.AUTH_ERROR:
            return {...state,islogin:false,error:action.error,loading:false}
        case actiontype.SET_PROFILE:
            return {...state,user:action.user};
        case actiontype.SET_REWARDS:
            return {...state,rewards:action.data};
        case actiontype.AUTH_LOGOUT_SUCCESS:
            return {
                islogin:false,
                isregistered:false,
                user:{},
                token:'',
                loading:false,
                erorr:[],
                role:''
            };
        case actiontype.Phone_Verify:
            return {...state,verify_phone:action.phone};
        case actiontype.GET_FANS:
            return {...state,fans:action.data};
        default:
            return state;
    }
}
