import { useChat } from '../../hooks/useChat';
import Message from '../message/message';
import robotAvatar from '@/shared/ui/assets/robot-avatar.svg';
import userAvatar from '@/shared/ui/assets/user-avatar.svg';
import styles from './chat.module.scss';
import SendForm from '../send-form/send-form';

const Chat = () => {
  const chat = useChat();

  return (
    <div className={styles.chat}>
      <div className={styles.chat__messagesContainer}>
        <Message
          avatar={robotAvatar}
          message="Hello! I’m BotHub, AI-based bot designed to answer all your questions."
        />
        {chat.messages.map((message) => (
          <Message
            key={message.id}
            avatar={message.isSended ? userAvatar : robotAvatar}
            message={message.text}
            isSended={message.isSended}
          />
        ))}
      </div>

      <div className={styles.sendMessageForm}>
        <SendForm
          onSubmit={chat.submit}
          onMessageChange={chat.handleMessageChange}
          messageText={chat.messageText}
          disabled={chat.isLoading}
        />
      </div>
    </div>
  );
};

export default Chat;
