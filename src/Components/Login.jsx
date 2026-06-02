import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { useState } from "react";


const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
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

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null)
            })
            .catch(error => {
                console.log('Error:', error)
            })
    }

    return (

        <div>
            {/* {user ? <button onClick={handleSignOut} className="btn btn-accent hover:bg-gray-200">Sign Out</button> : <button onClick={handleGoogleSignIn} className="btn btn-accent hover:bg-gray-200">Google Login</button>}
            {user &&
                <div>
                    <h1 className="font-bold text-2xl mt-5">User: {user.displayName}</h1>
                    <h1 className="font-bold text-xl mt-2">Email: {user.email}</h1>
                    <img className="mx-auto rounded-lg" src={user.photoURL} alt="" />
                </div>
            } */}

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
                <h1 className="text-3xl font-bold my-5">Please Login!</h1>
                <div className="card-body">
                    <form className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Enter Your Email" required />
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Enter Your Password" required />
                        <div className="text-left"><a className="link link-hover text-l">Forgot password?</a></div>
                        <button className="btn btn-neutral hover:bg-gray-200 hover:text-gray-800 mt-4">Login</button>
                    </form>
                    <button onClick={handleGoogleSignIn} className="btn btn-accent hover:bg-gray-200">Google Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;