import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: {
    bio,
    interests,
    user: { name, avatar }
} }) => <div class="profile-about bg-light p-2">
    {bio && 
    <>
        <h2 class="text-primary">who is {name.trim().split(' ')[0]} </h2>
        <p>{bio}</p>
        <div class="line"></div>
    </>
    }
      <h2 class="text-primary">Interests</h2>
      <div class="skills">
        {interests.map((interest, index) => (
            <div key={index} class="p-1">
                <i class="fas fa-check"></i> {interest}
            </div>
        ))}
      </div>
    </div>

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
