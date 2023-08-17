import { Chat } from '@/widgets/chat';
import bgCircles from './ui/assets/background-circles.png';
import styles from './page.module.scss';

const ChatPage = () => {
  return (
    <div className={styles.chatPage}>
      <div className={styles.bg}>
        <img src={bgCircles} alt="" className={styles.bg__img} />
        <div className={styles.bg__overlay}></div>
      </div>
      <div className={styles.chatPage__container}>
        <h1 className={styles.chatPage__title}>Bot Chat</h1>
        <p className={styles.chatPage__subtitle}>AI-based service</p>
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;
