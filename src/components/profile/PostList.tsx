import styles from './style/PostList.module.css';

const PostList = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.postsGrid}>{children}</main>;
};

export default PostList;
