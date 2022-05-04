import Card from "components/Card";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Issue } from "types";
import styles from "./styles.module.scss";

type Props = {
  user: Issue["issue"]["user"];
  date: Date;
  children: string;
};

const Comment = ({ user, date, children }: Props) => (
  <Card>
    <Card.Header>
      <a href={user.html_url} className={styles.avatar}>
        <img src={user.avatar_url} alt="avatar" />
      </a>
      <div className={styles.username}>
        <a href={user.html_url}>{user.login}</a>
      </div>
      <div className={styles.date}>{date.toLocaleString()}</div>
    </Card.Header>

    <div className={styles.body}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children}</ReactMarkdown>
    </div>
  </Card>
);

export default Comment;
