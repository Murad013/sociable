import Cookies from 'universal-cookie';

const RemoveCookie = (cookieName) => {
     return Cookies.remove(cookieName);
};

export default RemoveCookie;