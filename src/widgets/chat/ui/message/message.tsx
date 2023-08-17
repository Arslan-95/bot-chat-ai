import { Avatar } from '@/shared/ui';
import styles from './message.module.scss';
import classNames from 'classnames';

type MessageProps = {
  avatar: string;
  message: string;
  isSended?: boolean;
};

const Message = ({ avatar, message, isSended }: MessageProps) => {
  return (
    <div
      className={classNames(styles.message, { [styles.isSended]: isSended })}
    >
      <Avatar src={avatar} />
      <div className={styles.message__container}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
