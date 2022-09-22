import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

import Head from 'next/head';

const Page = ({ contents, data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <h1 className="mb-8 text-center text-2xl font-bold">{data.title}</h1>
      <div className="prose mx-auto max-w-5xl prose-a:text-blue-600">
        <ReactMarkdown>{contents}</ReactMarkdown>
      </div>
      {data.links && (
        <h2 className="mt-8 text-center text-xl font-bold">Ссылки</h2>
      )}
      <ul className="mx-auto mt-4 max-w-xl list-inside list-disc">
        {data.links?.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              target="_blank"
              rel="nofollow, noopener, noreferrer"
            >
              {link.description}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync('content/cards');
  return {
    paths: files.map(filename => ({
      params: {
        slug: filename.replace('.md', ''),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdown = fs.readFileSync(path.join('content/cards', slug + '.md'));
  const parsedMarkdown = matter(markdown);
  return {
    props: {
      contents: parsedMarkdown.content,
      data: parsedMarkdown.data,
    },
  };
};
export default Page;
