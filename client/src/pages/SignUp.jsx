import {Link} from 'react-router-dom'
const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-4'>
        <input placeholder='username' type='text' id='username' className='border p-3 rounded-lg' />
        <input placeholder='email' type='email' id='email' className='border p-3 rounded-lg' />
        <input placeholder='password' type='password' id='password' className='border p-3 rounded-lg' />
        <button  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70'>Sign Up</button>
      </form>
      <div className='flex gap-3 mt-5'>
        <p>Have an account? </p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp