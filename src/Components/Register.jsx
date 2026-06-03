import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log('Email:', email, 'Password:', password);

        setRegisterError(''); // Clear up the error massage after each new try (1)
        // setRegisterSuccess('')

        if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
            setRegisterError('Password must be 6+ characters, have an uppercase letter, and a number.');
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                // setRegisterSuccess(result)
                setRegisterError(''); // Clear up the error massage after success (2)
                toast.success('Account Successfully Created!');
                e.target.reset(); //clear the input field after user created
            })
            .catch(error => {
                // console.log(error);
                if (error.code === 'auth/email-already-in-use') {
                    setRegisterError('This email is already registered.');
                }
                else {
                    setRegisterError(error.message);
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

    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
                <h1 className="text-3xl font-bold my-5">Please Register!</h1>
                <div className="card-body">
                    <form onSubmit={handleRegister} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" name="email" className="input" placeholder="Enter Your Email" required />

                        <label className="label">Password</label>
                        <div className="relative w-full flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input"
                                placeholder="Enter Your Password" required />
                            <span className="cursor-pointer absolute right-6" onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>
                                }
                            </span>
                        </div>
                        {
                            registerError && <p className="text-red-500">{registerError}</p>
                        }
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