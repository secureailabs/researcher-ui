import { Box, IconButton, Typography } from '@mui/material';
import styles from './CommentBox.module.css';
import { connect } from 'react-redux';
import { DefaultService, GetCommentChain_Out, GetComment_Out } from 'src/client';
import useNotification from 'src/hooks/useNotification';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface CommentProps {
  commentChainId: string;
  comment: GetComment_Out;
  setCommentChain: (commentChainId: GetCommentChain_Out) => void;
}

const CommentBox: React.FC<CommentProps> = ({ commentChainId, comment, setCommentChain }) => {
  const [sendNotification] = useNotification();

  const handleDeleteButtonClicked = async () => {
    const post_commnet_response = await DefaultService.deleteCommentFromCommentChain(commentChainId, comment.id);
    if (post_commnet_response) {
      setCommentChain(post_commnet_response);
    } else {
      sendNotification('Error', 'Failed to add comment', 'error');
    }
  };

  return (
    <Box sx={{ marginTop: '20px' }} className={styles.container}>
      <Box className={styles.comment}>
        <Typography variant="body1">{comment.comment}</Typography>
      </Box>
      <Typography variant="body2">{comment.user.name}</Typography>
      {comment.time !== undefined ? <Typography variant="body2">{new Date(comment.time).toLocaleString()} </Typography> : null}
      <Box className={styles.commentActions}>
        <IconButton aria-label="delete" color="error" onClick={handleDeleteButtonClicked}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  userProfile: state.userprofile
});

export default connect(mapStateToProps)(CommentBox);
