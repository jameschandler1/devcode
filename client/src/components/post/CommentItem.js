import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    deleteComment,
    showActions,
}) => (
      <div class="post bg-dark p-1 my-1">
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
          {!auth.loading && user === auth.user._id && (
            <button
                onClick={(e) => deleteComment(postId, _id)}
                type="button"
                class="btn btn-danger"
            >
                <i class="fas fa-times"></i>
            </button>
    )}
        </div>
      </div>
)
    

            

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
