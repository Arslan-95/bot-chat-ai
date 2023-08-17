import { ButtonHTMLAttributes } from 'react';
import sendIcon from '@/shared/ui/assets/carbon_send-filled.svg';
import styles from './send-icon-button.module.scss';

type SendIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const SendIconButton = (props: SendIconButtonProps) => {
  return (
    <button className={styles.sendIconButton} {...props}>
      <img src={sendIcon} alt="send" />
    </button>
  );
};

export default SendIconButton;
