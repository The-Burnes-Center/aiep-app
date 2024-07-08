'use client'
import {useState} from 'react'
import LoginForm from '@/components/landing/LoginForm'
import SignupForm from '@/components/landing/SignupForm'

export default function UserLoginModal({modal_id}) {
    const [isSignup, setIsSignup] = useState(false);

    const toggleForm = () => {
      setIsSignup((prev) => !prev);
    };

    return (
        <dialog id={modal_id} className="modal">
            <div className="modal-box">
                <div className="auth-page justify-center">
                    {isSignup ? (
                        <>
                        <SignupForm />
                        <p className="font-semibold mt-4">
                            Already have an account?{' '}
                            <a href="#" onClick={toggleForm} className="text-blue-500">
                            Click here to sign in
                            </a>
                        </p>
                        </>
                    ) : (
                        <>
                        <LoginForm />
                        <p className="font-semibold mt-4">
                            Don't have an account?{' '}
                            <a href="#" onClick={toggleForm} className="text-blue-500">
                            Click here to create an account
                            </a>
                        </p>
                        </>
                    )}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}