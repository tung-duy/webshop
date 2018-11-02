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
      const category = await Categories.findOne({ where: { name } });
      if (category) {
        errors.category = "Category already exists!";
        return res.status(400).json(errors);
      }
      const newCategory = { name, description };
      Categories.create(newCategory)
        .then(category => res.json(category))
        .catch(err => res.json(err));
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
        return res.status(400).json(errors);
      }
      const category = await Categories.findById(id);
      category.update({ name, description }).then(category => {
        return res.json(category);
      });
    } else {
      errors.user = "You do not have access";
      return res.status(403).json(errors);
    }
  },
  getListCate: async (req, res) => {
    const errors = {};
    Categories.findAll({ order: [["id", "DESC"]], offset: 1, limit: 3 }).then(
      categories => {
        if (!categories) {
          errors.category = "Category not found!";
          res.status(400).json(errors);
        }
        return res.json(categories);
      }
    );
  },
  deleteCate: (req, res) => {
    const errors = {};
    if (req.user.isAdmin) {
      const id = req.params.cate_id;
      Categories.findById(id).then(category => {
        if (category == null) {
          errors.category = "Category does not exists!";
          return res.status(400).json(errors);
        } else {
          category
            .destroy()
            .then(() => {
              return res.json({ success: true });
            })
            .catch(err => {
              console.log(err);
              return res.json(err);
            });
        }
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
        .catch(err => {
          console.log(err);
          return res.json(err);
        });
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
          .catch(err => res.json(err));
      }
      product
        .update(updateProduct)
        .then(prod => res.json(prod))
        .catch(err => res.json(err));
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
          return res.status(400).json(errors);
        }
        return res.json(products);
      })
      .catch(err => {
        console.log(err);
        return res.json(err);
      });
  },
  getProduct: (req, res) => {
    const errors = {};
    const id = req.params.prod_id;
    Products.findById(id)
      .then(prod => {
        if (!prod) {
          errors.product = "Product not found";
          return res.status(400).json(errors);
        } else {
          return res.json(prod);
        }
      })
      .catch(err => {
        console.log(err);
        return res.json(err);
      });
  },
  getProdByCate: (req, res) => {
    const errors = {};
    const id = req.params.cate_id;
    Products.findAll({ where: { cate_id: id } })
      .then(products => {
        if (products.length <= 0) {
          errors.product = "Product not found!";
          return res.status(400).json(errors);
        }
        return res.json(products);
      })
      .catch(err => {
        console.log(err);
        return res.json(err);
      });
  },
  deleteProduct: async (req, res) => {
    const errors = {};
    if (req.user.isAdmin) {
      const id = req.params.prod_id;
      const product = await Products.findById(id);
      if (!product) {
        errors.product = "Product not found";
        return res.status(400).json(errors);
      }
      const filePath = `public/uploads/${product.image}`;
      fs.unlink(filePath);
      product
        .destroy()
        .then(() => {
          return res.json({ success: "Delete success!" });
        })
        .catch(err => {
          console.log(err);
          return res.json(err);
        });
    } else {
      errors.user = "You do not have access";
      return res.status(403).json(errors);
    }
  }
};
