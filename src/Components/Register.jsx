import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { useState } from "react";

const Register = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log('Email:', email, 'Password:', password);
    }

    const handleGoogleSignIn = () => {
            signInWithPopup(auth, provider)
                .then(result => {
                    const loggedInUser = result.user;
                    console.log(loggedInUser);
                    setUser(loggedInUser)
                })
                .catch(error => {
                    console.log('Error:', error)
                })
        };

    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
                <h1 className="text-3xl font-bold my-5">Please Register!</h1>
                <div className="card-body">
                    <form onSubmit={handleRegister} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" name="email" className="input" placeholder="Enter Your Email" required />

                        <label className="label">Password</label>
                        <input type="password" name="password" className="input" placeholder="Enter Your Password" required />

                        <div className="text-left"><a className="link link-hover text-l">Forgot password?</a></div>
                        <button className="btn btn-neutral hover:bg-gray-200 hover:text-gray-800 mt-4">Register</button>
                    </form>
                    <button onClick={handleGoogleSignIn} className="btn btn-accent hover:bg-gray-200">Register via Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;