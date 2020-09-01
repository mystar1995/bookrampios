import {all} from 'redux-saga/effects';
import auth from './auth';
import home from './home';
import category from './category';
import content from './content';
import fan from './fans';
import wishlist from './wishlist';
import notification from './notification';
import payment from './payment';
import read from './read';
import rating from './rating';
import authorinfo from './authorinfo';
import bookmark from './bookmark';
import bookinfo from './bookinfo';
import freebook from './freebook';
import config from './config';
import settlement from './settlement';

export default function* rootSaga()
{
    yield all([
        auth(),
        home(),
        category(),
        content(),
        fan(),
        wishlist(),
        notification(),
        payment(),
        read(),
        rating(),
        authorinfo(),
        bookmark(),
        bookinfo(),
        freebook(),
        config(),
        settlement()
    ])    
}