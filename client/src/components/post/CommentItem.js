import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../actions/post';
import Moment from 'react-moment';

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    deleteComment,
    showActions,
}) => (
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/user/${user}`}>
            <img
              class="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">
            {text}
          </p>
          <p class="post-date">Posted on{` `} 
          <Moment format="YYYY-MM-DD HH:MM:SS">{date}</Moment>
          </p>
        </div>
      </div>
)
    

            

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {  })(CommentItem);
