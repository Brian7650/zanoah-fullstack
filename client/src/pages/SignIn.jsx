import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'; //uncomment this line. Add useSelector for error message code alert
import { signInStart, signInSuccess } from '../redux/user/userSlice'; //uncomment this line
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user); // uncomment this line
  // const [errorMessage, setErrorMessage] = useState(null); replace with const { loading, error: errorMessage } = useSelector
  // const [loading, setLoading] = useState(false);   replace with const { loading, error: errorMessage } = useSelector
  const dispatch = useDispatch(); //uncomment this line
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.')); //uncomment this line
      // return setErrorMessage('Please fill out all fields.'); replace with dispatchError code above
    }
    try {
      dispatch(signInStart());
      // setLoading(true); Replace with dispatchEvent(signInStart()
      // setErrorMessage(null);  Replace with dispatchEvent(signInStart()
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message)); //uncomment this line
        // return setErrorMessage(data.message); replace with dispatchError(data.message)
      }
      // setLoading(false); Delete this line. No longer need  because the above sign in failure is going to set the loading to false.
      if(res.ok) {
        dispatch(signInSuccess(data)); // uncomment this line
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message)); //uncomment this line
      // setErrorMessage(error.message); replace with dispatch Error code
      // setLoading(false);   replace with dispatch Error code
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-sky-300 hover:bg-sky-200 rounded-lg text-white'>
              Zanoah
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
          You can sign in to your account using your email and password.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='email address'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              className='bg-sky-300 hover:bg-sky-200'
              // gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont have an account?</span>
            <Link to='/sign-up' className='text-sky-300 '>
              Sign up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
