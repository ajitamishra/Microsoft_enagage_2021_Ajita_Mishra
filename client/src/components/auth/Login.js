import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            userId: '',
            password: '',
            role:'',
            errors: {}
        };
    }

    componentDidMount() {
        // redirect a logged in user to dashboard if he visits login/register routes
       
        if(this.props.auth.isAuthenticated && this.state.role=='Teacher') {
            this.props.history.push("/teacher");
        }
        if(this.props.auth.isAuthenticated && this.state.role=='student') {
            this.props.history.push("/student");
        }

    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.auth.isAuthenticated && this.state.role=='Teacher') {
            // push user to dashboard when they login
    
            this.props.history.push("/teacher");
        }
        if(nextProps.auth.isAuthenticated && this.state.role=='Student') {
            // push user to dashboard when they login
    
            this.props.history.push("/student");
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            userId: this.state.userId,
            password: this.state.password,
            role:this.state.role
        };

        this.props.loginUser(userData);

        console.log(userData);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row" style={{ marginTop: "4rem" }}>
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>Bact to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <strong>Login</strong> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input type="text" id="userId" className={classnames("", {invalid: errors.userId})} value={this.state.userId} onChange={this.onChange} error={errors.userId} />
                                <label htmlFor="userId">User Id</label>
                                <span className="red-text">{errors.userId}</span>
                            </div>
                            <div className="input-field col s12">
                                <input type="password" id="password" className={classnames("", {invalid: errors.password || errors.passwordincorrect})} value={this.state.password} onChange={this.onChange} error={errors.password} />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="input-field col s12">
                                <input type="text" id="role" className={classnames("", {invalid: errors.role})} value={this.state.role} onChange={this.onChange} error={errors.role} />
                                <label htmlFor="role">Role</label>
                                <span className="red-text">{errors.role}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button 
                                    type="submit" 
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3" 
                                    style={{ widows: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }}
                                >Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

// export default Login
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
