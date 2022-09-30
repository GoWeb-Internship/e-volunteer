import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PATH = 'content/centers';

export const getCentersData = locale => {
  const fullPath = path.join(PATH, `${locale}.md`);
  const markdown = fs.readFileSync(fullPath);
  const parsedMarkdown = matter(markdown);

  return {
    title: parsedMarkdown.data.title,
    list: parsedMarkdown.data.list,
  };
};
