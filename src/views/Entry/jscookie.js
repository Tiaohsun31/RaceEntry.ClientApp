import Cookies from "js-cookie";

function setCookie(name,value) {
    Cookies.set(name,value);
}

function removeCookie(name) {
    Cookies.remove(name);
}

function getCookie(name){
    return Cookies.get(name);
}

export { setCookie, removeCookie,getCookie }