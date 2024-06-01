// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register = () => {
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
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="photo">Profile Photo</label>
            <Input
              id="photo"
              type="file"
              {...register('photo', { required: 'Profile photo is required' })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.photo ? 'border-red-500' : ''}`}
            />
            {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <Link className='text-center' to="/login">Already Have A Account?</Link>
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

export default Register;
