import { useParams } from "react-router";
import sendRequest from "../utilities/send-request";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [replies, setReplies] = useState([]); // Initialize the replies state as an empty array

  async function getOnePost() {
    try {
      const postData = await sendRequest(`/api/posts/onePost/${id}`);
      console.log(postData);
      console.log(postData.replies);
      setPost(postData);
      setReplies(postData.replies);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOnePost();
  }, [id]);

  return (
    <>
      <div>{post && <PostCard user={post.user} posts={[post]} />}</div>

      {replies.length > 0 && (
        <>
          <h2 className="px-5">Replies to @{post?.user?.username}</h2>
          <div>{replies && <PostCard user={post.user} posts={replies} />}</div>
        </>
      )}
    </>
  );
}
