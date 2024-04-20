import {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Signup(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirm_password,setConfirmPassword] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        //resetting error state
        setError("");

        if(!username){
            setError("Please enter username");
            return;
        }
        if(!password){
            setError("Please enter password");
            return;
        }
        if(!confirm_password){
            setError("Please re-enter password");
            return;
        }
        if(!email){
            setError("Please enter email");
            return;
        }
        if(password!==confirm_password){
            setError("Passwords do not match");
            return;
        }

        axios.post("http://localhost:8000/signup",{username,password,email})
        .then(result => console.log(JSON.stringify(result.data)))
        .catch(err=> {
            console.log(err);
            setError("Failed to Sign you in...try again");
        })
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>We would love you to be one of us...</h2>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Username</strong>
                        </label>
                        <input type="text" placeholder="Enter username" autoComplete="off" name="username" className="form-control rounded-0" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder="Enter password" autoComplete="off" name="password" className="form-control rounded-0" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Confirm Password</strong>
                        </label>
                        <input type="password" placeholder="Confirm your password" autoComplete="off" name="confirm_password" className="form-control rounded-0" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder="Enter email" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success rounded-1">
                        Signup
                    </button>
                </form>
                    <p>Already have an account ?</p>
                    <Link to="/signup" className="btn btn-info border w-100 rounded-1 text-decoration-none">
                        Login
                    </Link>
                
            </div>
        </div>
    );
}

export default Signup;