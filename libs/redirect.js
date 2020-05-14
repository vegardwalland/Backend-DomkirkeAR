import Router from 'next/router'
import { isLoggedIn } from './helperFunctions';

export default function redirIfNotLoggedIn(page) {
    if (isLoggedIn()) {
        return;
    }
    Router.push(page);
}
