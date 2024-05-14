import {
    Form,
    Link,
    useSearchParams,
    useActionData,
    useNavigation,
  } from 'react-router-dom'
  import classes from './AuthForm.module.css';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
  function AuthForm() {
    const data = useActionData();
    console.log( data); 
    useEffect(()=>{
        if(data){
            if(typeof data  =="object"){
                toast.error(data.status.message)

            }
            else{
                toast.error(data)
            }
        }
    },[data])
    const navigation = useNavigation();
  
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';
  
    return (
      <>

   
    <Form method="post" className={classes.form} style={{ maxWidth: '400px', margin: '100px auto' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data ? (
            typeof data === 'object' ? (
            <ul style={{ color: 'red', textAlign: 'center', listStyleType: 'none', padding: 0 }}>
                
            </ul>
            ) : (
            <p style={{ color: 'red', textAlign: 'center' }}>{data}</p>
            )
        ) : null}

        {data && data.message && <p style={{ textAlign: 'center' }}>{data.message}</p>}
        <p style={{ textAlign: 'center' }}>
            <label htmlFor="email" style={{ color: '#555' }}>Email</label>
            <input id="email" type="email" name="email" required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </p>
        <p style={{ textAlign: 'center' }}>
            <label htmlFor="password" style={{ color: '#555' }}>Password</label>
            <input id="password" type="password" name="password" required style={{ display: 'block', width: '100%', marginBottom: '20px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </p>
            {!isLogin && (
            <p style={{ textAlign: 'center' }}>
                <label htmlFor="password" style={{ color: '#555' }}>Confirm password</label>
                <input id="confirm_password" type="password" name="password_confirmation" required style={{ display: 'block', width: '100%', marginBottom: '20px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </p>
            )}

        <div className={classes.actions} style={{ textAlign: 'center' }}>
            <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} style={{ marginRight: '10px', color: '#007bff' }}>
            {isLogin ? 'Create new user' : 'Login'}
            </Link>
            <button disabled={isSubmitting} style={{ padding: '10px 20px', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none' }}>
             {isSubmitting ? 'Submitting...' : `${isLogin ? 'Log in' : 'Sing up'}`}
            </button>

        </div>
    </Form>

      </>
    );
  }
  
  export default AuthForm;