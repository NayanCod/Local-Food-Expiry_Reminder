import { Link } from "react-router-dom";
function Login(){
    return(
        // TODO: Make login form having field email and password only and at last signup Link if not have account
        <div>
            Login Page<br></br>
            <Link to="/signup">Signup</Link>
        </div>
    )
}

export default Login;