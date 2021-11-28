import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';


class Navbar extends Component {
    onLogoutClick = e => {
        this.props.logoutUser();
        
    };
    render() {
        const { user } = this.props.auth;
    return (
        <div className="navbar-fixed">
            <nav className="z-depth-2">
                <div className="nav-wrapper white">
                    <Link 
                        to="/" 
                        className="col s5 brand-logo center black-text heading"
                    >
                        Assignment Submission Portal
                    </Link>
                   
                </div>
            </nav>
            <button
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3 logout_btn"
                            style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }}
                        >
                            Logout
                        </button>
        </div>
    );
}
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);

