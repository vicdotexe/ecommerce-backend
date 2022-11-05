const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagsData = await Tag.findAll({include:Product});
    if (tagsData.length == 0){
      return res.status(404).json({message:"No tags exist."})
    }
    const tags = tagsData.map(tag=>tag.get({plain:true}))
    return res.json(tags);
  }catch(err){
    return res.status(500).json({err:err.message})
  }


});

// get one tag by id
router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {include:Product});
    if (!tagData){
      return res.status(404).json({message: "No tags with that ID exist."});
    }
    const tag = tagData.get({plain:true});
    return res.json(tag);
  }catch(err){
    return res.status(500).json({err:err.message})
  }
});

// create a new tag
router.post('/', async(req, res) => {
  // create a new tag
  try{
    const tag = await Tag.create(req.body);
    return res.status(201).json(tag);
  }catch(err){
    return res.status(500).json({err:err.message});
  }
});

// update a tag by id
router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const updated = await Tag.update(req.body, {where:{id:req.params.id}});
    return res.json(updated);
  }catch(err){
    return res.json({err:err.message});
  }

});

// delete a tag by id
router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const deleted = await Tag.destroy({where:{id:req.params.id}});
    return res.json(deleted)
  }catch(err){
    return res.status(500).json({message: err.message});
  }
});

module.exports = router;
