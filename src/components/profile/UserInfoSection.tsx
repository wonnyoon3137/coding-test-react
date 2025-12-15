import styles from './style/UserInfo.module.css';

const UserInfoSection = ({ name, bio }: { name: string; bio: string }) => {
  return (
    <section className={styles.userInfoSection}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.bio}>{bio}</p>
    </section>
  );
};

export default UserInfoSection;
