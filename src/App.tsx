import { Toaster } from "react-hot-toast";
import AddPost from "./Components/AddPost";
import PostList from "./Components/PostList";
import Spinner from "./Components/Spinner";
import { useFetch } from "./hooks/useFetch";
import Post from "./types/Post";
import Pagination from "./Components/Pagination";

export const baseUrl = "https://jsonplaceholder.typicode.com";

function App() {
  const { data, error, isLoading } = useFetch<Post>(
    baseUrl + "/posts?_limit=15"
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500 text-2xl p-4">{error}</p>;
  }

  return (
    <>
      <Toaster />
      <AddPost />
      <div>{data.length > 0 && <PostList posts={data} />}</div>
      <Pagination />
    </>
  );
}

export default App;
