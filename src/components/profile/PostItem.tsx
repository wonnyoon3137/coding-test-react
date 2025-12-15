import styles from './style/PostItem.module.css';

const PostItem = ({ imageUrl, caption }: { imageUrl: string; caption: string }) => {
  return (
    <div className={styles.postItem}>
      <img src={imageUrl} alt={caption} className={styles.postImage} />
    </div>
  );
};

export default PostItem;
