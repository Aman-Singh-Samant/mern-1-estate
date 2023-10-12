import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const SignUp = () => {
  //states
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  //this function saves the values in form to the state obj
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  //this function submits the form values
  const handleSubmit = async (e)=>{
    e.preventDefault() //prevents refresher/rerender of page on submit
    try {
       setLoading(true);

       const res = await fetch("/api/auth/signup", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       }); //proxy(http://localhost:3000) can be found in vite.config. Used to reduce site path.
       const data = await res.json();
       console.log(data);
       if (data.success === false) {
         //success is the json key defined in index
         setError(data.message);
         setLoading(false);
         return;
       }
       setLoading(false);
       setError(null)
       navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message)
      console.log(error)
    }
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input placeholder='username' type='text' id='username' className='border p-3 rounded-lg' onChange={handleChange} />
        <input placeholder='email' type='email' id='email' className='border p-3 rounded-lg' onChange={handleChange} />
        <input placeholder='password' type='password' id='password' className='border p-3 rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70'>
          {loading ? 'Loading...' : 'Sign up'}
        </button>
      </form >
      <div className='flex gap-3 mt-5'>
        <p>Have an account? </p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp