import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {signInWithGoogle}= useContext(AuthContext);
    const location = useLocation();
    const from = location.state || '/';
    const navigate = useNavigate();

    const handleGoogleSignIn=()=>{
        signInWithGoogle()
        .then(result=>{
            console.log(result.user);
            navigate(from);
        })
        .catch(error=>{
            console.log(error.message);
        })
    }
    return (
        <div>
             <div className="divider">OR</div>
             <button onClick={handleGoogleSignIn} className='btn'>Google</button>
        </div>
    );
};

export default SocialLogin;