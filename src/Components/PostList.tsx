import type PostType from "../types/Post";
import Post from "./Post";

interface Props {
  posts: PostType[];
}

const PostList = ({ posts }: Props) => {
  return (
    <>
      <h1 className="text-3xl mb-3">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => <Post key={post.id} post={post} />).reverse()}
      </div>
    </>
  );
};

export default PostList;
