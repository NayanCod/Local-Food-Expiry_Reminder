import { Link } from "react-router-dom";
function Signup(){
    return(
         // TODO: Make Signup form having field name, email and password and at last login Link if already have an account
        <div>
            Signup Page<br></br>
            <Link to="/login">Login here</Link>
        </div>
    )
}

export default Signup;