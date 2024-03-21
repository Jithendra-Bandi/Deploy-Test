import {useState} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';

const Login = props => {
    const [errorMsg, setErrorMsg] = useState("");

    if (Cookies.get('jwt_token') !== undefined) {
        return <Redirect to="/" />
    }

    const onLogin = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const options = {
            method: 'POST',
            body: formData
        }
        const url = "http://spring-deploy.ap-southeast-2.elasticbeanstalk.com/login";
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.text();
            if (data === "Mobile Number Doesn't exist") {
                setErrorMsg(data);
            }
            else if (data === "Invalid Password") {
                setErrorMsg(data);
            }
            else {
                setErrorMsg("Success");
                Cookies.set('jwt_token', data, {expires:30});
                const {history} = props;
                history.replace('/');
            }
        }
        else setErrorMsg("Something Went Wrong");
    }
    return (
        <form onSubmit={onLogin}>
            <h1>Login Form</h1>
            <input type="text" name='mobileNumber' placeholder="Enter Mobile Number" /><br />
            <input type="password" name='password' placeholder="Enter Password" /><br />
            <button type="submit">Login</button>
            <p>{errorMsg}</p>
        </form>
    )
}

export default Login;