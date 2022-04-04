const Comments = ({ commentProps }) => {
  return (
    <div className='Comments'>
      {/* <div>{new Date(ticket.createdAt).toLocaleString('en-us')}</div> */}
      <p>{commentProps.content}</p>
      <hr />
    </div>
  );
};
export default Comments;
