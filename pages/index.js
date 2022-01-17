import PostFeed from "../components/PostFeed";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spacestagram by Alex Kalinins</title>
        <meta property="og:title" content="Spacestagram" key="ogtitle" />
        <meta
          property="og:description"
          content="Front End Developer Intern Challenge - Summer 2022"
          key="ogdescription"
        />
      </Head>
      <main>
        <div className="pageContainer">
          <h1>Spacestagram</h1>
          <h4>by Alex Kalinins</h4>
          <a href="https://github.com/alexkalinins/shopify-challenge">GitHub</a>
          <PostFeed />
        </div>
      </main>
    </div>
  );
}
