import { getAllPostsData } from "../lib/api";


const serviceId = process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY;
const baseUrl = `https://${serviceId}.microcms.io/api/v1`
const apiKey: string = process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY as string;

const Home = (posts: any) => {
  console.log(posts);
  return (
    <div>
      <main>
        <h1 className="text-red-400">こんにちは</h1>
      </main>
    </div>
  )
}

export default Home;

export const getStaticProps = async () => {
  const posts = await getAllPostsData();
  return {
    props: {posts}
  }
}
