import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PATH = 'content/footer';

export const getFooterData = locale => {
  const fullPath = path.join(PATH, `${locale}.md`);
  const markdown = fs.readFileSync(fullPath);
  const parsedMarkdown = matter(markdown);

  return {
    contents: parsedMarkdown.content || null,
  };
};
