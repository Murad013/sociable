import Cookies from 'universal-cookie';

const RemoveCookie = (cookiename) => {
     return Cookies.remove(cookiename);
};

export default RemoveCookie;