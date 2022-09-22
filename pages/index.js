import Head from 'next/head';

import { attributes, react as HomeContent } from '../content/home.md';

const Home = () => {
  let { title, cats } = attributes;

  return (
    <>
      <Head>
        <title>Home Page</title>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <article>
        <h1>{title}</h1>

        <HomeContent />

        <input type="email" class="form-input rounded-full px-4 py-3" />

        <select class="form-select rounded-full px-4 py-3"></select>

        <input type="checkbox" class="form-checkbox rounded text-pink-500" />

        <ul>
          {cats.map((cat, k) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default Home;
