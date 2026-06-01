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
        .then(result =>{
            console.log(result)
            setUser(null)
        })
        .catch(error =>{
            console.log('Error:', error)
        })
    }

    return (

        <div>
            {user ? <button onClick={handleSignOut} className="btn btn-accent hover:bg-gray-200">Sign Out</button> : <button onClick={handleGoogleSignIn} className="btn btn-accent hover:bg-gray-200">Google Login</button>}
            {user &&
                <div>
                    <h1 className="font-bold text-2xl mt-5">User: {user.displayName}</h1>
                    <h1 className="font-bold text-xl mt-2">Email: {user.email}</h1>
                    <img className="mx-auto rounded-lg" src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;