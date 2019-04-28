import { requestArticle } from './functions/spa';

const url = window.location.pathname;

window.onload = requestArticle(url);