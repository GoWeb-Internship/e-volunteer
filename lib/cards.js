import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getSortedCardData = locale => {
  const filesHref = fs.readdirSync('content/cards');
  const filterFilesHref = filesHref.filter(item => item.includes(locale));

  const slugs = filterFilesHref
    .map(filename => {
      const id = filename.replace(`-${locale}.md`, '');

      const fullPath = path.join('content/cards/', `${id}-${locale}.md`);
      if (!fs.existsSync(fullPath)) return;

      const fileContents = fs.readFileSync(fullPath);
      const data = matter(fileContents).data;
      const date = data.date.toString();
      const title = data.title;

      return { href: filename, date, title };
    })
    .sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
      return 1;
    });

  return slugs;
};

export const getAllCardsPath = locales => {
  const files = fs.readdirSync('content/cards');
  let paths = [];
  for (let locale of locales) {
    for (let file of files) {
      const slug = file.includes(locale) && file.replace(`-${locale}.md`, '');
      if (!slug) continue;
      paths.push({ params: { slug }, locale });
    }
  }
  console.log(paths);
  return paths;
};

export const getCardData = (slug, locale) => {
  console.log('slug', slug);
  console.log('locale', locale);
  const fullPath = path.join('content/cards', `${slug}-${locale}.md`);
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
