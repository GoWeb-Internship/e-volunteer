import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getSortedCardData = locale => {
  const filesHref = fs.readdirSync('content/cards');

  const slugs = filesHref
    .map(filename => {
      const fullPath = path.join(
        'content/cards/',
        filename,
        `index.${locale}.md`,
      );
      if (!fs.existsSync(fullPath)) return;
      const fileContents = fs.readFileSync(fullPath);
      const data = matter(fileContents).data;
      const date = data.date.toString();
      const title = data.title;
      return { href: filename, date, title };
    })
    .filter(slugs => slugs);

  return slugs.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    return 1;
  });
};

export const getAllCardsPath = locales => {
  let paths = [];
  const files = fs.readdirSync('content/cards');
  for (let file of files) {
    for (let locale of locales) {
      let fullPath = path.join('content/cards', file, `index.${locale}.md`);
      if (!fs.existsSync(fullPath)) continue;
      paths.push({ params: { slug: file }, locale });
    }
  }
  return paths;
};

export const getCardData = (slug, locale) => {
  const fullPath = path.join('content/cards', slug, `index.${locale}.md`);
  const markdown = fs.readFileSync(fullPath);
  const parsedMarkdown = matter(markdown);
  return {
    contents: parsedMarkdown.content,
    data: {
      title: parsedMarkdown.data.title,
      date: parsedMarkdown.data.date.toString(),
      links: parsedMarkdown.data.links || null,
    },
  };
};
