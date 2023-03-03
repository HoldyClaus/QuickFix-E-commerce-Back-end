const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {

    const tagData = await Tag.findAll({
      include: [Product],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    },
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(400).json(err))
});

module.exports = router;