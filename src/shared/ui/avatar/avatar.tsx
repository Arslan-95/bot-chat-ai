import styles from './avatar.module.scss';

type AvatarProps = {
  src: string;
};

const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img src={src} alt="avatar" className={styles.avatar__img} />
    </div>
  );
};

export default Avatar;
