import { SendIconButton } from '@/shared/ui';
import styles from './send-form.module.scss';

type SendFormProps = {
  onSubmit: () => void;
  messageText: string;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const SendForm = ({
  onSubmit,
  messageText,
  onMessageChange,
  disabled,
}: SendFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.sendForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.sendForm__input}
        placeholder="Start typing here..."
        value={messageText}
        onChange={onMessageChange}
      />
      <div className={styles.sendForm__button}>
        <SendIconButton disabled={disabled} />
      </div>
    </form>
  );
};

export default SendForm;
