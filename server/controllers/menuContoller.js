const Menu = require('../models/menu')

async function addMenu(req, res){
    try{
        const { menus } = req.body
        if(!menus || !Array.isArray(menus) || menus.length === 0){
            return res.status(400).json({message : "Menus array is required"})
        } 
       for(let menu of menus){
               if(!menu.day || !menu.breakfast || !menu.lunch || !menu.dinner || !menu.snacks)
                     return res.status(400).json({ message: "All menu fields required" })
       } 
        const savedMenus = await Menu.insertMany(menus)
        return res.status(201).json({
            message : "weekly menu added successfully",
            data : savedMenus
        });
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


// Get latest menu posted

async function getMenu(req, res) {
  try {

    const latest = await Menu.findOne().sort({ weekStartDate: -1 });
    if (!latest) return res.status(404).json({ message: "No menus found" });

    const menus = await Menu.find({ weekStartDate: latest.weekStartDate });
    return res.status(200).json({ data: menus });

  } catch (err) {

     return res.status(500).json({ message: err.message });

  }
}

module.exports = { addMenu , getMenu}