import React, { Component } from "react";
import { Link} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

// import BG from "../images/bg.png";
import classnames from "classnames";

// var bgStyle = {
//   width: "100%",
//   height: "400px",
//   backgroundImage: "url(" + { BG } + ")",
// };

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      userId: "",
      email: "",
      password: "",
      password2: "",
      role:"",
      errors: {},
    };
  }

  componentDidMount() {
    // redirect a logged in user to dashboard if he visits login/register routes
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      userId: this.state.userId,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role:this.state.role
    };

    this.props.registerUser(newUser, this.props.history);

    console.log(newUser);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>Bact to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <strong>Register</strong> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  type="text"
                  id="name"
                  className={classnames("", { invalid: errors.name })}
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  type="text"
                  id="userId"
                  className={classnames("", { invalid: errors.userId })}
                  value={this.state.userId}
                  onChange={this.onChange}
                  error={errors.userId}
                />
                <label htmlFor="userId">User Id</label>
                <span className="red-text">{errors.userId}</span>
              </div>
              <div className="input-field col s12">
                <input
                  type="text"
                  id="role"
                  className={classnames("", { invalid: errors.role })}
                  value={this.state.role}
                  onChange={this.onChange}
                  error={errors.role}
                />
                <label htmlFor="role">Role</label>
                <span className="red-text">{errors.role}</span>
              </div>
              <div className="input-field col s12">
                <input
                  type="email"
                  id="email"
                  className={classnames("", { invalid: errors.email })}
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  type="password"
                  id="password"
                  className={classnames("", { invalid: errors.password })}
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  type="password"
                  id="password2"
                  className={classnames("", { invalid: errors.password2 })}
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  style={{
                    widows: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// export default Register
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
