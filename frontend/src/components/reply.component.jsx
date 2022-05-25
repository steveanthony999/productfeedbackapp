import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';

import { commentSelectors } from '../features/feedback/commentSlice';
import { createReply, reset } from '../features/feedback/replySlice';

import userInfo from '../user.json';

import '../styles/components/reply.css';

const Reply = ({ commentProps, replyProps, isFromReply }) => {
  const { replies, isError, isSuccess, message } = useSelector(
    (state) => state.replies
  );
  const { feedbackId } = useParams();
  // const selectAllComments = useSelector(commentSelectors.selectAll);
  const selectCommentById = useSelector((state) =>
    commentSelectors.selectById(state, commentProps.id)
  );

  const dispatch = useDispatch();

  const [content, setContent] = useState('');

  const user = userInfo.currentUser;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      dispatch(reset);
    }

    dispatch(reset);
  }, [dispatch, isError, isSuccess, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id } = isFromReply ? replyProps : selectCommentById.id; // The id of the comment/reply user is replying to
    const { username } = isFromReply ? replyProps.user : selectCommentById.user;
    const replyData = {
      commentId: id,
      id: uuid(),
      replyingTo: username,
      content,
      user,
    };
    // comments: [...comments, { id: uuid(), content, user }],

    dispatch(createReply({ feedbackId, replyData }));

    // console.log({ feedbackId, ...replyData });

    setContent('');
  };

  useEffect(() => {
    console.log(selectCommentById);
  }, [selectCommentById]);

  return (
    <div className='Reply'>
      <form onSubmit={handleSubmit}>
        <textarea
          className='border body-2 text-darker-blue'
          name='reply'
          id='reply'
          value={content}
          onChange={(e) => setContent(e.target.value)}></textarea>
        <button className='text-very-light h4 border'>Post Reply</button>
      </form>
    </div>
  );
};
export default Reply;
