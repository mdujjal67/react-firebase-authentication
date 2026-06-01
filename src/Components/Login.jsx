import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../Firebase/firebase.config";


const Login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
        .then( result => {
            const user = result.user;
            console.log(user)
        })
        .catch(error => {
            console.log('Error:', error)
        })
    }

    return (

        <div>
            <button onClick={handleGoogleSignIn} className="btn btn-accent hover:bg-gray-200">Google Login</button>
        </div>
    );
};

export default Login;