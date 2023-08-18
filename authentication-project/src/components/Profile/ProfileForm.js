import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
    const history = useHistory();
    const newPasswordInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value; 

        // add validation

        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAmbg8ep15kGch7W0uYMBd0L9kkbmtckY0', 
            {
				method: 'POST',
				body: JSON.stringify({
					idToken: authCtx.token,
					password: enteredNewPassword,
					returnSecureToken: false
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}
            ).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => {
                        let errorMessage = 'Authentication failed!';
                        // if (data && data.error && data.error.message) {
                        // 	errorMessage = data.error.message;
                        // }
                        throw new Error(errorMessage);
                    });
                }
            })
            .then(data => {
                history.replace('/');
            })
            .catch(err => {
                alert(err.message);
            });
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' minLength='6' ref={newPasswordInputRef}/>
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
