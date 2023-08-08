import { Box, Typography } from '@mui/material';
import styles from './CommentBox.module.css';
import { connect } from 'react-redux';
import { DefaultService, GetCommentChain_Out, GetComment_Out } from 'src/client';
import useNotification from 'src/hooks/useNotification';

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
      <Box className={styles.commentActions}>
        <Typography variant="body2" onClick={handleDeleteButtonClicked}>
          Delete
        </Typography>
      </Box>
      <Box className={styles.comment}>
        <Typography variant="body1">{comment.comment}</Typography>
      </Box>

      <Box className={styles.commentInfo}>
        <Typography variant="body2">{comment.user.name}</Typography>
        <Typography variant="body2">{comment.time}</Typography>
        <Typography variant="body2">{comment.organization.name}</Typography>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  userProfile: state.userprofile
});

export default connect(mapStateToProps)(CommentBox);
