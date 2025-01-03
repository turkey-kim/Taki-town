import { CommentProps } from "@/type";
import styles from "./comments-list.module.css";
import CommentCard from "../comment-card/comment-card";

type CommentsListProps = {
  commentsList: CommentProps[];
};

export default function CommentsList({ commentsList }: CommentsListProps) {
  return (
    <div className={styles["wrapper"]}>
      {commentsList.map((e) => (
        <CommentCard
          key={e.author + e.comment + e.recomment}
          author={e.author}
          date={e.date}
          comment={e.comment}
          recomment={e.recomment}
          recommentDate={e.recommentDate}
        />
      ))}
    </div>
  );
}
