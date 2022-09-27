const cards = require('../../cache/data').cards;

const getCardsCache = (req, res) => {
  const results = req.query.q
    ? cards.filter(
        card =>
          card.title.toLowerCase().includes(req.query.q.toLowerCase()) ||
          card.text.toLowerCase().includes(req.query.q.toLowerCase()),
      )
    : [];

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }));
};

export default getCardsCache;
