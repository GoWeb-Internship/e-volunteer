import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PATH = 'content/banner';

export const getBannerData = locale => {
  const fullPath = path.join(PATH, `${locale}.md`);
  const markdown = fs.readFileSync(fullPath);
  const parsedMarkdown = matter(markdown);

  return {
    contents: parsedMarkdown.content ?? null,
  };
};
