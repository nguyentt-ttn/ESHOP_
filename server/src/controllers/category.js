import Category from "../models/category.js"    
export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting categories" });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);  
        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting category" });
    }
};


export const createCategory = async (req, res) => {
    try {
        const newCategory = await Category(req.body).save(); 
        res.status(201).json(newCategory);  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Cập nhật category
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(updatedCategory);  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating category" });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id); 
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(deletedCategory);  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting category" });
    }
};
