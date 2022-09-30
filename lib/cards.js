import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PATH = 'content/categories';

export const getSortedCardData = locale => {
  const filesHref = fs.readdirSync(PATH);

  const slugs = filesHref
    .map(filename => {
      const fullPath = path.join(PATH, filename, `${locale}.md`);
      if (!fs.existsSync(fullPath)) return;
      const fileContents = fs.readFileSync(fullPath);
      const data = matter(fileContents).data;
      const range = data.range.toString();
      const title = data.title;
      const poster = data.poster;
      const preview = data.preview;
      const alt = data.alt;

      return { href: filename, range, title, poster, preview, alt };
    })
    .sort((a, b) => a.range.localeCompare(b.range));

  return slugs;
};

export const getAllCardsPath = locales => {
  const files = fs.readdirSync(PATH);
  let paths = [];

  for (let file of files) {
    for (let locale of locales) {
      let fullPath = path.join(PATH, file, `${locale}.md`);
      if (!fs.existsSync(fullPath)) continue;
      paths.push({ params: { slug: file }, locale });
    }
  }

  return paths;
};

export const getCardData = (slug, locale) => {
  const fullPath = path.join(PATH, slug, `${locale}.md`);
  const markdown = fs.readFileSync(fullPath);
  const parsedMarkdown = matter(markdown);

  return {
    contents: parsedMarkdown.content,
    data: {
      title: parsedMarkdown.data.title,
      range: parsedMarkdown.data.range.toString(),
    },
  };
};
