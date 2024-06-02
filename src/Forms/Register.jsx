import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useAuth from '@/Hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosPublic from '@/Hooks/useAxiosPublic';

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, googleLogin, twitterLogin, updateUserProfile } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (socialProvider) => {
    socialProvider()
      .then(result => {
        if (result.user) {
          navigate(location?.state || "/");
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    handleSocialLogin(googleLogin);
  };

  const handleTwitterLogin = () => {
    handleSocialLogin(twitterLogin);
  };

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      const formData = new FormData();
      formData.append('image', data.photo[0]);

      const res = await axiosPublic.post(imageHostingAPI, formData);
      const imageUrl = res.data.data.display_url;

   if(res){
    await updateUserProfile(imageUrl, data.name);
    toast.success('Registration successful');
    if (result.user) {
      navigate(location?.state || "/");
    }
   }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex py-20 justify-center items-center min-h-screen bg-gray-100">
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register('password', { required: 'Password is required' })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
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
            <Link className='text-center' to="/login">Already Have An Account?</Link>
          </div>
        </form>
        <hr className='mt-5' />
        <div className="flex gap-5 justify-center pt-4">
          <button onClick={handleGoogleLogin}><img className="h-9 w-9 rounded-full" src="/image/google-icon.png" alt="google" /></button>
          <button onClick={handleTwitterLogin}><img className="h-9 w-9 rounded-full" src="/image/twitter-icon.png" alt="twitter" /></button>
        </div>
      </div>
    </div>
  );
}

export default Register;
