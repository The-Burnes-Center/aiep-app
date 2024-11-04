'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/UserAuthentication';

const SignupForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [generalError, setGeneralError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  
    const router = useRouter();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  
      if (name === 'password') {
        setPasswordValidation({
          length: value.length >= 8,
          uppercase: /[A-Z]/.test(value),
          lowercase: /[a-z]/.test(value),
          number: /[0-9]/.test(value),
          specialChar: /[!@#$%^&*]/.test(value),
        });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setGeneralError('');
      setFieldErrors({});
      try {
        const response = await signup(formData);
        console.log(response)
        if (!response.Error) {
          setIsSuccess(true);
          setTimeout(() => {
            router.push('/portal/home');
          }, 500); // Redirect after 0.5 seconds
        } else {
          const data = await response.Error.detail;
          if (data.errors) {
            setGeneralError('Signup failed, Invalid Username or Password');
            const errors = data.errors.reduce((acc, err) => {
              err.data.forEach((item) => {
                acc[item.field] = item.message;
              });
              return acc;
            }, {});
            setFieldErrors(errors);
          } else {
            setGeneralError('Signup failed, Invalid Username or Password');
          const errors = data.reduce((acc, err) => {
            const field = err.loc[1];
            acc[field] = err.msg;
            return acc;
          }, {});
          setFieldErrors(errors);
          }
        }
      } catch (err) {
        setGeneralError('An error occurred. Please try again.');
      }
    };
  
    return (
      <div>
        <p className="font-bold text-black">Sign Up with Your Email & Password</p>
        {generalError && (
          <div role="alert" className="alert alert-error mt-5 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{generalError}</span>
          </div>
        )}
        {isSuccess && (
          <div role="alert" className="alert alert-success mt-5 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Sign Up Successful! Welcome to AIEP...</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex-col items-center w-full h-full">
          <label className="input input-bordered flex items-center gap-2 w-full mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
            <input type="text" name="email" value={formData.email} className="grow" placeholder="Email" onChange={handleChange} />
          </label>
          {fieldErrors.email && (
            <div role="alert" className="alert alert-error mt-1 mb-1">
              <span>{fieldErrors.email}</span>
            </div>
          )}
          <label className="input input-bordered flex items-center gap-2 w-full mt-2 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input type="password" name="password" value={formData.password} className="grow" placeholder="Password" onChange={handleChange} />
          </label>
          <ul className="text-sm list-disc list-inside my-4">
            <li className={passwordValidation.length ? 'text-green-600' : 'text-red-600'}>
              Password must be at least 8 characters long
            </li>
            <li className={passwordValidation.uppercase ? 'text-green-600' : 'text-red-600'}>
              Password must contain at least one uppercase letter
            </li>
            <li className={passwordValidation.lowercase ? 'text-green-600' : 'text-red-600'}>
              Password must contain at least one lowercase letter
            </li>
            <li className={passwordValidation.number ? 'text-green-600' : 'text-red-600'}>
              Password must contain at least one number
            </li>
            <li className={passwordValidation.specialChar ? 'text-green-600' : 'text-red-600'}>
              Password must contain at least one special character
            </li>
          </ul>
          {fieldErrors.password && (
            <div role="alert" className="alert alert-error mt-1 mb-1">
              <span>{fieldErrors.password}</span>
            </div>
          )}
          <button type='submit' className="btn btn-wide btn-primary btn-sm p-2">
            <h3 className="text-primary-content">Sign Up</h3>
          </button>
        </form>
      </div>
    );
  };
  
  export default SignupForm;