const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { i18n } = require('../next-i18next.config');

function getCards() {
  const cardsDirectory = path.join(process.cwd(), 'content/cards'); //retrieving the posts directory path
  const fileNames = fs.readdirSync(cardsDirectory); // getting the names of the files, with the .md extension
  let cards = [];
  for (let fileName of fileNames) {
    for (let locale of i18n.locales) {
      const id = fileName;
      let fullPath = path.join('content/cards', fileName, `index.${locale}.md`);
      if (!fs.existsSync(fullPath)) continue;
      const fileContents = fs.readFileSync(fullPath, 'utf8'); //getting the contents of the file
      const matterResult = matter(fileContents);
      cards.push({
        id,
        title: matterResult.data.title, // readinf the file and retrieving its id and title from the markdown
        text: matterResult.content,
        language: matterResult.data.language,
      });
    }
  }
  return JSON.stringify(cards);
}

const fileContents = `export const cards = ${getCards()}`; // here we created the contents of the cache file

try {
  fs.readdirSync('cache');
} catch (e) {
  fs.mkdirSync('cache');
}
// if cache directory exists, ok else create it

fs.writeFile('cache/data.js', fileContents, function (err) {
  // writing to the cache/data.js file
  if (err) return console.log(err);
  console.log('Posts cached.');
});
