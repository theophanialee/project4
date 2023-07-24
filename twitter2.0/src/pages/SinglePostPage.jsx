import { useParams } from "react-router";
import sendRequest from "../utilities/send-request";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { UserContext } from "./App/App";

export default function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState();

  async function getOnePost() {
    try {
      const postData = await sendRequest(`/api/posts/onePost/${id}`);
      console.log(postData);
      setPost(postData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOnePost();
  }, [id]);

  return <>{post && <PostCard user={post.user} posts={[post]} />}</>;
}
