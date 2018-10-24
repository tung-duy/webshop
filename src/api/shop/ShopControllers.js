const { Categories } = require("./ShopModel");

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
  }
};
