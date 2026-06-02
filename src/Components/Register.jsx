import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    // const [registerError, setRegisterError] = useState('');
    // const [registerSuccess, setRegisterSuccess] = useState('');

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log('Email:', email, 'Password:', password);
  
        // To clear up the error or success massage after each new try
        // setRegisterError('');
        // setRegisterSuccess('')

        if(password.length < 6){
            toast.error('Password should be at least 6 character or longer');
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                // setRegisterSuccess(result)
                toast.success('Account Successfully Created!')
            })
            .catch(error => {
                console.log(error);
                // setRegisterError(error.message)
                toast.error(error.message)
            })
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
                        {/* {
                            registerError && <p className="text-red-500">{registerError}</p>
                        } */}
                        {/* {
                            registerSuccess && <p className="text-green-500">{registerSuccess}</p>
                        } */}

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