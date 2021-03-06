import { GetStaticProps } from "next"
import { useState } from "react";
import Post from "../components/blog/Post";
import { Blog, fetchAllBlogs } from "../lib/api"

interface Blogs {
  blogs: Blog[];
}

const Articles = ({blogs}: Blogs) => {
  const arrayTags = () => {
    const tags = blogs.map((blog) => {
      return blog.tag
    });
    const tags_sort = Array.from(new Set(tags)).sort();
    return ["すべて", ...tags_sort];
  }
  const tags = arrayTags();

  const [tag, setTag] = useState<Blog['tag']>("");

  const isFilter = (blog: Blog) => {
    if(!tag){
      return blog.tag === blog.tag;
    }else {
      return blog.tag === tag;
    }
  }
  const new_blogs = blogs.filter(isFilter);
  const tagFilter = (tag: Blog['tag']) => {
    if(tag === "すべて"){
      setTag("");
    }else {
      setTag(tag);
    }
  };

  return (
    <div>
      <div className="grid gap-2 grid-cols-7 my-12 ml-5">
        {tags.map((tag) => (
          <div key={tag}>
            <button onClick={() => tagFilter(tag)}
            className="bg-gray-400 px-2 rounded"
            >
              {tag}
            </button>
          </div>
        ))}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2">
        {new_blogs && new_blogs.map((blog) => (
          <li key={blog.id}>
            <Post {...blog} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Articles

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await fetchAllBlogs();
  return {
    props: {
      blogs
    }
  }
}