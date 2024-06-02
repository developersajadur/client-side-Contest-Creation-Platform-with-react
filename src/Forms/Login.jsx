import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import useAuth from '@/Hooks/useAuth';

const Login = () => {
  const { signInUser, googleLogin, twitterLogin  } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = socialProvider => {
    socialProvider()
        .then(result => {
            if (result.user) {
                toast.success('Login successful');
                navigate(location?.state || "/");
            }
        })
        .catch(error => {
            toast.error(error.message);
        });
};

const handleTwitterLogin = () => {
    handleSocialLogin(twitterLogin);
};

  const handleGoogleLogin = () => {
    handleSocialLogin(googleLogin);
};

  const onSubmit = data => {
    signInUser(data.email, data.password)
      .then((result) => {
        if (result.user) {
          toast.success('Login successful');
          navigate(location?.state?.from || "/");
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white justify-center items-center rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                onClick={handleTogglePassword}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <Link className='text-center' to="/register">Do Not Have An Account?</Link>
          </div>
        </form>
        <hr className='mt-5' />
        <div className="flex gap-5 justify-center pt-4">
          <button onClick={handleGoogleLogin}><img className="h-9 w-9 rounded-full" src="/image/google-icon.png" alt="google" /></button>
          <button onClick={handleTwitterLogin}><img className="h-9 w-9 rounded-full" src="/image/twitter-icon.png" alt="facebook" /></button>
        </div>
      </div>
    </div>
  );
}

export default Login;
