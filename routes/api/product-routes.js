const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async(req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try{
    const productsData = await Product.findAll({
      include:[Category, {
        model:Tag,
        as: 'tags'
      }]
    });
    if (productsData.length == 0){
      return res.status(404).json({message: "No products available."})
    }
    const products = productsData.map(product=> product.get({plain:true}))
    return res.json(products);
  }catch(err){
    console.log(err.message);
    return res.json({
      err: err.message
    })
  }

});

// get one product
router.get('/:id', async(req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try{
    const productData = await Product.findByPk(req.params.id,{
      include:[Category, {
        model:Tag,
        as: 'tags'
      }]
    });
    if (!productData){
      return res.status(404).json({message: "No product with that ID."})
    }
    const product = productData.get({plain:true});
    return res.json(product);
  }catch(err){
    console.log(err.message);
    return res.json({
      err: err.message
    })
  }
});

// create new product
router.post('/', async(req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 try{
  const createdProduct = await Product.create(req.body);
  if (createdProduct && req.body.tagIds){
    const productTags = req.body.tagIds.map((tag_id)=>{
      return {
        product_id: createdProduct.id,
        tag_id: tag_id
      }
    });
    await ProductTag.bulkCreate(productTags);
  }
  const product = await Product.findByPk(createdProduct.id, {include:Tag});
  res.status(201).json(product);
 }catch(err){
  return res.status(500).json({err: err.message})
 }


});

// update product by id
router.put('/:id', async(req, res) => {

  try{
    //does it exist?
    const exists = await Product.findByPk(req.params.id);
    if (!exists){
      return res.status(404).json({message:"Product with that ID doesn't exist"});
    }

    //update the product
    await Product.update(req.body, {where:{id:req.params.id}});
  
    //if tags array was included
    if (req.body.tagIds){
      const oldTagsData = await ProductTag.findAll({where:{product_id : req.params.id}}); //get all old productTags
      const oldTagsIds = oldTagsData.map((tag)=> tag.get({plain:true}).id); //extract their ids
      await ProductTag.destroy({where: {id:oldTagsIds}}); //delete all of them
  
      //generate the data for the new productTags FROM THE REQ.BODY
      const newProductTags = req.body.tagIds.map((tag_id)=>{return {
        tag_id:tag_id,
        product_id: req.params.id
      }})
      await ProductTag.bulkCreate(newProductTags); //bulk create in our database from the 'newProductTags' data we mapped out
    }
  
    const productData = await Product.findByPk(req.params.id, {include:Tag});
    const product = productData.get({plain:true})
    return res.json(product);

  }catch(err){
    return res.status(500).json({err:err.message})
  }
});

// delete product by id
router.delete('/:id', async(req, res) => {
  const deleted = await Product.destroy({where:{id:req.params.id}});
  return res.json(deleted);
});

module.exports = router;
