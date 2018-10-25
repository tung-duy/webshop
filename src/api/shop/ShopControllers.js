const Sequelize = require("sequelize");
const { Categories, Products } = require("./ShopModel");
const Op = Sequelize.Op;
const fs = require("fs");

module.exports = {
  //Categories
  addCategory: async (req, res) => {
    const errors = {};
    if (req.user.isAdmin) {
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
    } else {
      errors.user = "You do not have access";
      return res.status(403).json(errors);
    }
  },
  updateCategory: async (req, res) => {
    const errors = {};
    if (req.user.isAdmin) {
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
    } else {
      errors.user = "You do not have access";
      return res.status(403).json(errors);
    }
  },
  getListCate: async (req, res) => {
    const errors = {};
    Categories.findAll({ order: [["id", "DESC"]], offset: 1, limit: 3 }).then(
      cates => {
        if (!cates) {
          errors.cate = "Category not found!";
          res.status(404).json(errors);
        }
        res.json(cates);
      }
    );
  },
  deleteCate: (req, res) => {
    const errors = {};
    if (req.user.isAdmin) {
      const id = req.params.cate_id;
      Categories.destroy({ where: { id } }).then(() => {
        return res.json({ success: true });
      });
    } else {
      errors.user = "You do not have access";
      return res.status(403).json(errors);
    }
  },

  // Products
  addProduct: (req, res) => {
    const errors = {};
    if (req.user.isAdmin) {
      const { cate_id, name, description, price } = req.body;
      const image = req.file.filename;
      Products.create({ cate_id, name, description, price, image })
        .then(product => res.json(product))
        .catch(err => console.log(err));
    } else {
      errors.user = "You do not have access";
      return res.status(403).json(errors);
    }
  },
  updateProduct: async (req, res) => {
    const errors = {};
    if (req.user.isAdmin) {
      const id = req.params.prod_id;
      const product = await Products.findById(id).then(prod => prod);
      const { cate_id, name, description, price } = req.body;
      const { file } = req;
      const updateProduct = { cate_id, name, description, price };
      if (file != undefined) {
        const filePath = `public/uploads/${product.image}`;
        fs.unlinkSync(filePath);
        Object.assign(
          {},
          updateProduct,
          (updateProduct.image = req.file.filename)
        );
        product
          .update(updateProduct)
          .then(prod => res.json(prod))
          .catch(err => console.log(err));
      }
      product
        .update(updateProduct)
        .then(prod => res.json(prod))
        .catch(err => console.log(err));
    } else {
      errors.user = "You do not have access";
      return res.status(403).json(errors);
    }
  },
  getListProducts: (req, res) => {
    const errors = {};
    Products.findAll()
      .then(products => {
        if (products.length <= 0) {
          errors.product = "Product not found!";
          return res.status(404).json(errors);
        }
        res.json(products);
      })
      .catch(err => console.log(err));
  },
  getProduct: (req, res) => {
    const errors = {};
    const id = req.params.prod_id;
    Products.findById(id)
      .then(prod => {
        if (!prod) {
          errors.product = "Product not found";
          res.status(404).json(errors);
        } else {
          return res.json(prod);
        }
      })
      .catch(err => console.log(err));
  },
  getProdByCate: (req, res) => {
    const errors = {};
    const id = req.params.cate_id;
    Products.findAll({ where: { cate_id: id } })
      .then(products => {
        if (products.length <= 0) {
          errors.product = "Product not found!";
          return res.status(404).json(errors);
        }
        res.json(products);
      })
      .catch(err => console.log(err));
  },
  deleteProduct: async (req, res) => {
    const errors = {};
    if (req.user.isAdmin) {
      const id = req.params.prod_id;
      const product = await Products.findById(id);
      if (!product) {
        errors.product = "Product not found";
        return res.status(404).json(errors);
      }
      const filePath = `public/uploads/${product.image}`;
      fs.unlink(filePath);
      product
        .destroy()
        .then(() => {
          return res.json({ success: "Delete success!" });
        })
        .catch(err => console.log(err));
    } else {
      errors.user = "You do not have access";
      return res.status(403).json(errors);
    }
  }
};
