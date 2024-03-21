import './index.css';
import {useState} from 'react'

const Registration = props => {
    const [error, setError] = useState("");
    const submitForm = async event => {
        event.preventDefault();
        let formData = new FormData(event.target);
        const options = {
            method:"POST",
            body:formData
        };
        const response = await fetch('http://spring-deploy.ap-southeast-2.elasticbeanstalk.com/registration', options);
        const data = await response.text();
        if (response.ok) {
            if (data === "This Mobile Number is already registered") {
                setError(data);
            }
            else {
                setError("");
                const {history} = props;
                history.push("/login");
            }
        }
        else console.log("Something Went Wrong");
    }
    return (
        <div className='container'>
            <form onSubmit={submitForm}>
                <h1>Registration Form</h1>
                <input type="text" name="name" placeholder='Enter Name'/><br />
                <input type='text' name="mobileNumber" placeholder='Enter Mobile Number'/><br />
                <input type='password' name="password" placeholder='Enter Password' /><br />
                <input type="file" name="file"/><br />
                <button type='submit'>Submit</button>
                <p>{error}</p>
            </form>
        </div>
    )
}

export default Registration;