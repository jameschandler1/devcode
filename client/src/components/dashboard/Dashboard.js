import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading}  }) => {
    
    useEffect(() => {
       getCurrentProfile();
    }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <> You have a profile </>
      ) : (
        <>
          {" "}
          <p> You haven't created a profile yet, please add some info.</p>{" "}
          <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
