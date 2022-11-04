const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Category');

// The `/api/categories` endpoint

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

router.post('/', async(req, res) => {
  // create a new category
	try{
		const created = await Category.create(req.body);
		return res.status(201).json(created);
	}catch(err){
		return res.status(500).json({err:err.message});
	}
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
	const updated = await Category.update(req.body, {where:{id:req.params.id}});
	console.log(updated);
	if (!updated[0]){
		return res.status(404).json({message:"ID doesn't exist, or no new data provided."})
	}
	return res.json({message:"Category Updated"})
  }catch(err){
    return res.status(500).json({err:err.message});
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
	const deleted = await Category.destroy({where:{id:req.params.id}});
	if (!deleted){
		return res.status(404).json({message: "Category with that ID doesn't exist."})
	}
	return res.json({message:"Category has been deleted."});
  }catch(err){
    return res.status(500).json({err:err.message});
  }
});

module.exports = router;
