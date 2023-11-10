import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice";
import Oauth from "../components/Oauth";

const SignIn = () => {
  //states
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch(); //we can dispatch the function using this hook

  //this function saves the values in form to the state obj
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //this function submits the form values
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents refresher/rerender of page on submit
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
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
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message))
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="email"
          type="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          placeholder="password"
          type="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <Oauth/>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Dont have an account? </p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
