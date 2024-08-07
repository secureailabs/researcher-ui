import { useParams } from 'react-router-dom';
import styles from './PatientChat.module.css';
import { Context, FormDataService, PatientChatService } from 'src/tallulah-ts-client';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import PromptInputBox from './components/PromptInputBox';
import logo from 'src/assets/images/array_insights_small.png';
import user_avatar from 'src/assets/images/users/avatar-3.png';

export interface IPatientChat {
  sampleTextProp?: string;
}

export const DynamicUserNameBreadCrumb = ({ match }: any) => {
  const id = match.params.id;
  const [name, setName] = useState<string>('');

  const getName = (formData: any) => {
    if (formData?.values?.firstName) {
      return 'Patient Chat :' + ' ' + formData?.values?.firstName?.value + ' ' + formData?.values?.lastName?.value;
    } else if (formData?.values?.name) {
      return 'Patient Chat :' + ' ' + formData?.values?.name?.value;
    }
    return id;
  };

  const fetchPatientFormDataById = async () => {
    try {
      const res = await FormDataService.getFormData(id as string);
      setName(getName(res));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatientFormDataById();
  }, []);

  return <span>{name}</span>;
};

const PatientChat: React.FC<IPatientChat> = ({ sampleTextProp }) => {
  const [chatId, setChatId] = useState('');
  const [chatHistory, setChatHistory] = useState<Context[] | undefined | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let { id } = useParams();

  const startPatientChat = async () => {
    setIsLoading(true);
    try {
      const res = await PatientChatService.startPatientChat({
        form_data_id: id as string
      });
      setChatId(res.id);
      // strip the 0 index as it is the initial message from the assistant
      setChatHistory(res?.chat?.slice(1));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchPatientFormDataById = async () => {
    try {
      const res = await FormDataService.getFormData(id as string);
      startPatientChat();
    } catch (error) {
      console.log(error);
    }
  };

  const patientChatApi = async (promptText: string) => {
    setIsLoading(true);
    try {
      const res = await PatientChatService.patientChat(chatId as string, promptText);
      setChatHistory(res?.chat?.slice(1));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (p: string) => {
    patientChatApi(p);
  };

  useEffect(() => {
    fetchPatientFormDataById();
  }, []);

  const ConversationComponent = (
    <Box className={styles.conversationBox}>
      {chatHistory?.map((chat, index) =>
        chat.role === 'assistant' ? (
          <Box key={index} className={styles.assistantBox}>
            <img src={logo} alt="Sail-Logo" width="30" />
            <div dangerouslySetInnerHTML={{ __html: chat.content }} />
          </Box>
        ) : (
          <Box key={index} className={styles.patientBox}>
            <Box className={styles.patientText}>{chat.content}</Box>
            <img src={user_avatar} alt="Sail-Logo" width="30" />
          </Box>
        )
      )}
    </Box>
  );

  return (
    <Box className={styles.container}>
      <Box className={styles.conversationBox}>{ConversationComponent}</Box>
      <Box className={styles.chatInputBox}>
        {isLoading ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : null}
        <PromptInputBox handleKeyPress={handleKeyPress} />
      </Box>
    </Box>
  );
};

export default PatientChat;
