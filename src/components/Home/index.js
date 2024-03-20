import {Component} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import './index.css';

class Home extends Component {
    state = {list:[], who:""};

    componentDidMount() {
        this.getList();
    }

    getList = async () => {
        const url = "http://deploy-test.ap-southeast-2.elasticbeanstalk.com/profiles";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({list: data});
    }

    checkAuthentication = async () => {
        const token = Cookies.get('jwt_token');
        const url = "http://deploy-test.ap-southeast-2.elasticbeanstalk.com/check-auth";
        const options = {
            method:'GET',
            headers: {
                Token: token
            }
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.text();
            this.setState({who:data});
        }
        else this.setState({who: 'something went wrong!'});
    }

    onLogout = () => {
        Cookies.remove('jwt_token');
        const {history} = this.props;
        history.replace("/login")
    }

    render() {
        if (Cookies.get('jwt_token') === undefined) return <Redirect to="/login" />
        const {who, list} = this.state
        return (
            <>
            <button type="button" onClick={this.checkAuthentication}>Check Who is Clicking.</button>
                <span>{who}</span>
            <button type="button" onClick={this.onLogout}>Logout</button>
                <ul>
                    {list.map(each => (
                    <li key={each.id}>
                        <img src={`data:image/jpeg;base64,${each.image}`} alt="profile" width="100px" />
                        <h1>{each.id}. {each.name}</h1>
                        <p>{each.mobileNumber}</p>
                    </li>
                    ))}
                </ul>
                
            </>
        )
    }
}

export default Home;