const Sequelize = require("sequelize");
const { Categories, Products } = require("./ShopModel");
const Op = Sequelize.Op;

module.exports = {
  //Categories
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
  },
  getListCate: async (req, res) => {
    const errors = {};
    Categories.findAll({ order: [["id", "DESC"]], offset: 1, limit: 3 }).then(
      cates => {
        if (!cates) {
          errors.cate = "Category not found!";
        }
        res.json(cates);
      }
    );
  },
  deleteCate: (req, res) => {
    const id = req.params.cate_id;
    Categories.destroy({ where: { id } }).then(() => {
      return res.json({ success: true });
    });
  },

  // Products
  addProduct: (req, res) => {
    const { cat_id, name, description, price } = req.body;
    const image = req.file.filename;
    Products.create({ cat_id, name, description, price, image })
      .then(product => res.json(product))
      .catch(err => console.log(err));
  }
};
