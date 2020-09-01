import {combineReducers,createStore,applyMiddleware,compose} from 'redux';
import {reducer as reduxFormReducer, reducer} from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import createActionBuffer from 'redux-action-buffer';
import reducers from './reduction';
import saga from './saga';


export default function configurestore()
{
    const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const store = createStore(combineReducers({...reducers}),composeEnhancers(applyMiddleware(...middlewares)));
    
    return {
        ...store,runSaga:[
            sagaMiddleware.run(saga)
        ]
    }
    
}