const Sequelize = require("sequelize");
const { Categories } = require("./ShopModel");
const Op = Sequelize.Op;

module.exports = {
  addCategory: async (req, res) => {
    const errors = {};
    const { name, description } = req.body;
    const cate = await Categories.findOne({ where: { name } });
    if (cate) {
      errors.cate = "Category already exists!";
      return res.status(404).json(errors);
    }
    const newCate = { name, description };
    Categories.create(newCate)
      .then(cate => res.json(cate))
      .catch(err => console.log(err));
  },
  updateCategory: async (req, res) => {
    const errors = {};
    const id = req.params.cate_id;
    const { name, description } = req.body;

    const isNameUnique = await Categories.findOne({
      where: {
        [Op.and]: [{ [Op.not]: { id } }, { name }]
      }
    });

    if (isNameUnique) {
      errors.name = "Name already exists!";
      return res.status(404).json(errors);
    }
    const cate = await Categories.findById(id);
    cate.update({ name, description }).then(cate => {
      return res.json(cate);
    });
  }
};
