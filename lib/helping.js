import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PATH = 'content/help';

export const getHelpData = locale => {
  const fullPath = path.join(PATH, `${locale}.md`);
  const markdown = fs.readFileSync(fullPath);
  const parsedMarkdown = matter(markdown);

  return {
    contents: parsedMarkdown.content,
    data: {
      title: parsedMarkdown.data.title,
    },
  };
};
