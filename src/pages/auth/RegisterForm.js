import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from '../../config/FirebaseConfig';
import { PropsX } from '../../config/PropsX';
import { UserAuth } from '../../contexts/AuthContextFirebase';

function RegisterForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { createUser, user } = UserAuth();

    const signUp = (e) => {
        e.preventDefault();
        setLoading(true)
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return;
        }
        createUser(email, password)
            .then((userCredential) => {
                setError("")
                setLoading(true)
                localStorage.clear();
                localStorage.setItem(PropsX.Token, userCredential.user.accessToken);
                localStorage.setItem(PropsX.CurrentUser, userCredential.user);
                console.log(userCredential);
                navigate("/documents")
            })
            .catch((err) => {
                setError("Failed to create an account")
                setLoading(false)
            });
    };


    return (
        <>
            <form onSubmit={signUp} >
                <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                    <div className="xl:w-1/3 md:w-1/3.5 sm:w-1/2 max-w-sm p-8">
                        {
                            error && <div className="p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                <span className="font-medium">Info alert!</span>
                                <p>{error}</p>
                            </div>
                        }
                        <div className="text-center md:text-left mb-4">
                            <h1 className="mr-1 font-bold text-2xl">Welcome!</h1>
                            <p>Please enter your credentials to sign up.</p>

                        </div>
                        <div className='mb-1'>
                            <label className='text-sm font-semibold'>Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required={true} className="text-sm w-full px-3 py-2 border border-solid border-gray-300 rounded focus:outline-none focus:ring-indigo-500" placeholder="Email Address" />
                        </div>
                        <div className='mb-1'>
                            <label className='text-sm font-semibold'>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required={true} minLength={6} className="text-sm w-full px-3 py-2 border border-solid border-gray-300 rounded focus:outline-none focus:ring-indigo-500" />
                        </div>
                        <div className=''>
                            <label className='text-sm font-semibold'>Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter confirm password" required={true} minLength={6} className="text-sm w-full px-3 py-2 border border-solid border-gray-300 rounded focus:outline-none focus:ring-indigo-500" />
                        </div>
                        <div className="text-center md:text-left mt-4">
                            <button disabled={loading} type="submit" className="w-full bg-indigo-500 hover:bg-indigo-700 px-5 py-3 text-white uppercase rounded text-xs tracking-wider disabled:opacity-75 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">
                                {!loading ? "Sign up" : <>
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Loading...</>}
                            </button>
                        </div>
                    </div>
                </section>
            </form>
        </>
    )
}

export default RegisterForm