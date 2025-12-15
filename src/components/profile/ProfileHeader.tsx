import Button from '../common/Button';
import styles from './style/ProfileHeader.module.css';

const ProfileHeader = ({ avatarUrl, name, username }: { avatarUrl: string; name: string; username: string }) => {
  return (
    <header className={styles.profileHeader}>
      <div className={styles.avatarContainer}>
        <img src={avatarUrl} alt={`${name}'s avatar`} className={styles.avatar} />
      </div>
      <div className={styles.userInfoContainer}>
        <h2 className={styles.username}>{username}</h2>
        <Button className={styles.editProfileButton}>프로필 편집</Button>
      </div>
    </header>
  );
};

export default ProfileHeader;
