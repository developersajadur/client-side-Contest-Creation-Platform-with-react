import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

 const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleGoogleLogin = () => {
    console.log('Google Login');
  }
  const handleFacebookLogin = () => {
    console.log('Facebook Login');
  }

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white justify-center items-center rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
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
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
            />
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
                    <button onClick={handleFacebookLogin}><img className="h-9 w-9 rounded-full" src="/image/facebook-icon.png" alt="facebook" /></button>
                    {/* <button onClick={handleTwitterLogin}><img className="h-9 w-9 rounded-full" src="./twitter-icon.png" alt="twitter" /></button> */}
                </div>
      </div>
    </div>
  );
}

export default Login;
