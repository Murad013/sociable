import { useNavigate } from "react-router-dom";

const {RemoveCookie} = require("../hooks/removecookie");


function Logout () {
     const navigate = useNavigate();
     RemoveCookie('authorization');
     navigate('/login', { replace: true });

}

export default Logout;