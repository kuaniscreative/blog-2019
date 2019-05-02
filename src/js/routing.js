import { requestArticle } from './functions/spa';

const hash = window.location.hash.split("").slice(1).join("");

if (hash.length !== 0 ) {
    requestArticle(hash);
}