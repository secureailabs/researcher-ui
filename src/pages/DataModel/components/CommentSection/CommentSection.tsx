import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './CommentSection.module.css';
import { GetCommentChain_Out, GetComment_Out, GetDataModel_Out } from 'src/client';
import { connect } from 'react-redux';
import CommentBox from 'src/pages/DataModel/components/CommentBox';
import { useState } from 'react';
import { DefaultService, AddComment_In } from 'src/client';
import useNotification from 'src/hooks/useNotification';
import { useQuery } from 'react-query';

type TCommentSectionProps = {
  dataModel: GetDataModel_Out;
};

const CommentSection: React.FC<TCommentSectionProps> = ({ dataModel }) => {
  const [newComment, setNewComment] = useState('');
  const [sendNotification] = useNotification();
  const [commentChain, setCommentChain] = useState<GetCommentChain_Out | undefined>(undefined);

  // Get the comment chain using react query
  const {
    data: commentChainData,
    isLoading: commentChainLoading,
    refetch: refetchCommentChain
  } = useQuery(['commentChain', dataModel.id], async () => {
    const commentChain = await DefaultService.getAllCommentChain(dataModel.id);
    setCommentChain(commentChain);
    return commentChain;
  });

  const handleSaveButtonClicked = async () => {
    const new_comment_req: AddComment_In = {
      comment: newComment
    };
    if (!commentChain || !commentChain.id) {
      return;
    }

    const post_commnet_response = await DefaultService.addCommentToCommentChain(commentChain.id, new_comment_req);
    if (post_commnet_response) {
      setCommentChain(post_commnet_response);
    } else {
      sendNotification('Error', 'Failed to add comment', 'error');
    }

    setNewComment('');
  };

  if (commentChainLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ marginTop: '20px' }} className={styles.container}>
      <Typography variant="h3" component="h3">
        Comments
      </Typography>

      {commentChain?.comments?.map((comment, index) =>
        commentChain?.id ? (
          <CommentBox key={index} comment={comment} commentChainId={commentChain?.id} setCommentChain={setCommentChain} />
        ) : null
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '20px'
        }}
      >
        <TextField
          id="values"
          label="New Comment"
          variant="outlined"
          className={styles.modalInput}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          mt: 1
        }}
      >
        <Button
          variant="contained"
          color="primary"
          className={styles.modalButton}
          sx={{
            width: '200px',
            marginLeft: '1rem'
          }}
          onClick={handleSaveButtonClicked}
        >
          Comment
        </Button>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  userProfile: state.userprofile
});

export default connect(mapStateToProps)(CommentSection);
