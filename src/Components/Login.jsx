import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [loginError, setLoginError] = useState('')
    const emailRef = useRef(null);
    const [passwordResetError, setPasswordResetError] = useState('')

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log('Email:', email, 'Password:', password);
        setLoginError(''); // Clear up the error massage after each new try (1)

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                // console.log(result.user);
                setLoginError(''); // Clear up the error massage after each new try (2)
                if (result.user.emailVerified) {
                    toast.success('Login Successful!');
                }
                else {
                    toast.error('Please verify your email address first to login')
                }
                e.target.reset(); //clear the input fields after login
            })
            .catch(error => {
                // console.log(error);
                if (error.code === 'auth/invalid-credential') {
                    setLoginError('Please Enter your correct email & password.');
                }
                else {
                    setLoginError(error.message);
                }
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

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        console.log(emailRef)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Validate if empty OR if it fails the regex pattern match
        if (!email) {
            setPasswordResetError('Please provide an email first');
            return;
        }
        else if (!emailRegex.test(email)) {
            setPasswordResetError('Please enter a valid registered email address (e.g., name@example.com).');
            return;
        }
        // password reset email validation
        sendPasswordResetEmail(auth, email)
            .then(result => {
                setPasswordResetError('');
                toast.success('An email has been send to your email-address to reset your password');
                console.log(result)
            })
            .catch((error) => {
                setPasswordResetError(error.message);
            });
    }


    // const handleSignOut = () => {
    //     signOut(auth)
    //         .then(result => {
    //             console.log(result)
    //             setUser(null)
    //         })
    //         .catch(error => {
    //             console.log('Error:', error)
    //         })
    // }

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
                    <form onSubmit={handleLogin} className="fieldset">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input"
                            ref={emailRef}
                            placeholder="Enter Your Email" required />
                        <label className="label">Password</label>
                        <input type="password" name="password" className="input" placeholder="Enter Your Password" required />
                        {
                            loginError && <span className="text-red-500 text-left">{loginError}</span>
                        }
                        <div className="text-left"><a onClick={handleForgetPassword} className="link link-hover text-l">Forgot password?</a>
                            <p className="text-red-500 text-left">{passwordResetError}</p>
                        </div>
                        <button className="btn btn-neutral hover:bg-gray-200 hover:text-gray-800 mt-4">Login</button>
                    </form>
                    <button onClick={handleGoogleSignIn} className="btn btn-accent hover:bg-gray-200">Google Login</button>
                    <p>Don't have an account? <Link className="text-blue-500" to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;