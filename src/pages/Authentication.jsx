import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm.jsx';
import { toast } from 'react-toastify';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  console.log(data.get('email'))
  console.log(data.get('password'))

  const user = {

    user:{
    email: data.get('email'),
    password: data.get('password'),
    password_confirmation: data.get('password_confirmation')
    }
  };
  console.log(user);
  
  const response = await fetch('http://localhost:4000/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.status === 422 || response.status === 401) {
   toast.error(data)
    
    
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

const resData = await response.json();
const token  = response.headers.get('Authorization');

toast.success(`${resData.status.message}`)

const jwtToken = token.split(' ')[1];
console.log('JWT token:', jwtToken);
  console.log(jwtToken);

  localStorage.setItem('token', jwtToken);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());
  return redirect('/');
}