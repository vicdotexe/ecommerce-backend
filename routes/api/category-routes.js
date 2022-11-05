const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Category');

// The `/api/categories` endpoint

// get all categories
router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoriesData = await Category.findAll({include:Product});
    if (!categoriesData){
      return res.status(404).json({message:"No Categories exist."});
    }
    const categories = categoriesData.map(cat=>cat.get({plain:true}));
    return res.json(categories);
  }catch(err){
    return res.status(500).json({err:err.message});
  }
});

// get one category by id
router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id,{include:Product});
    if (!categoryData){
      return res.status(404).json({message:"No categories with that ID exist."});
    } 
    const category = categoryData.get({plain:true});
    return res.json(category);
  }catch(err){
    return res.status(500).json({err:err.message});
  }
});

// create a new category
router.post('/', async(req, res) => {
  // create a new category
	try{
		const created = await Category.create(req.body);
		return res.status(201).json(created);
	}catch(err){
		return res.status(500).json({err:err.message});
	}
});

// update an existing category by id
router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
	const updated = await Category.update(req.body, {where:{id:req.params.id}});
	return res.json(updated)
  }catch(err){
    return res.status(500).json({err:err.message});
  }
});

// delete a category by id
router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
	const deleted = await Category.destroy({where:{id:req.params.id}});
	return res.json(deleted);
  }catch(err){
    return res.status(500).json({err:err.message});
  }
});

module.exports = router;
