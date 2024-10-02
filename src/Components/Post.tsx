import { TrashIcon } from "@heroicons/react/24/outline";
import type Post from "../types/Post";
import { baseUrl } from "../App";
import toast from "react-hot-toast";
interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  const deletePost = async (postId: number) => {
    console.log(postId);
    try {
      const response = await fetch(`${baseUrl}/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }
      if (response.ok) {
        toast.success("Post Deleted");
      }
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "An unknown error occured"
      );
    }
  };

  return (
    <div
      key={post.id}
      className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm  hover:border-gray-400"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">
          {post.title.substring(0, 30)}
        </p>
        <p className="truncate text-sm text-gray-500">
          {post.body.substring(0, 120)}...
        </p>
      </div>
      <button
        onClick={() => {
          deletePost(post.id);
        }}
        className=" "
      >
        <TrashIcon className="h-5 w-5 text-red-500" />
      </button>
    </div>
  );
};

export default Post;
