const MenuItem = require("../models/MenuItem");
const logger = require("../utils/Logger");

const generateNextItemId = async () => {
    try {
        logger.info("Generating next itemId");
        const lastItem = await MenuItem.findOne().sort({ itemId: -1 }).select('itemId');

        if (!lastItem) {
            logger.info("No existing item found, starting with itemId 1");
            return 1;
        }

        const nextItemId = lastItem.itemId + 1;
        logger.info("Generated next itemId");
        return nextItemId;
    } catch (error) {
        logger.error("Error generating next itemId");
        throw error;
    }
};

exports.createMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, image, discount, freeItem, availability } = req.body;

        const itemId = await generateNextItemId();
        logger.info("Attempting to create new menu item");

        const menuItem = new MenuItem({
            itemId,
            name,
            description,
            price,
            category,
            image,
            discount,
            freeItem,
            availability
        });

        await menuItem.save();
        logger.info("Menu item created successfully");
        res.status(201).json(menuItem);
    } catch (error) {
        logger.error("Error creating menu item");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.updateMenuItemByItemId = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { name, description, price, category, availability, image, freeItem, discount } = req.body;

        logger.info("Attempting to update menu item by itemId");

        const menuItem = await MenuItem.findOne({ itemId });
        if (!menuItem) {
            logger.error("Menu item update failed - item not found by itemId");
            return res.status(404).json({ msg: "Menu item not found" });
        }

        if (name !== undefined) {
            menuItem.name = name;
        }
        if (description !== undefined) {
            menuItem.description = description;
        }
        if (price !== undefined) {
            menuItem.price = price;
        }
        if (category !== undefined) {
            menuItem.category = category;
        }
        if (availability !== undefined) {
            menuItem.availability = availability;
        }
        if (image !== undefined) {
            menuItem.image = image;
        }
        if (freeItem !== undefined) {
            menuItem.freeItem = freeItem;
        }
        if (discount !== undefined) {
            menuItem.discount = discount;
        }

        await menuItem.save();
        logger.info("Menu item updated successfully by itemId");
        res.status(200).json(menuItem);
    } catch (error) {
        logger.error("Error updating menu item by itemId");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.deleteMenuItemByItemId = async (req, res) => {
    try {
        const { itemId } = req.params;
        logger.info("Attempting to delete menu item by itemId");

        const menuItem = await MenuItem.findOne({ itemId });
        if (!menuItem) {
            logger.error("Menu item deletion failed - item not found by itemId");
            return res.status(404).json({ msg: "Menu item not found" });
        }

        await MenuItem.findOneAndDelete({ itemId });
        logger.info("Menu item deleted successfully by itemId");
        res.status(200).json({ msg: "Menu item deleted successfully" });
    } catch (error) {
        logger.error("Error deleting menu item by itemId");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getMenuItems = async (req, res) => {
    try {
        logger.info("Fetching all menu items");
        const menuItems = await MenuItem.find().lean();
        logger.info("Menu items fetched successfully");
        res.status(200).json(menuItems);
    } catch (error) {
        logger.error("Error fetching menu items");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getMenuItemByItemId = async (req, res) => {
    try {
        const { itemId } = req.params;
        logger.info("Fetching menu item by itemId");

        const menuItem = await MenuItem.findOne({ itemId });
        if (!menuItem) {
            logger.error("Menu item not found by itemId");
            return res.status(404).json({ msg: "Menu item not found" });
        }

        logger.info("Menu item fetched successfully by itemId");
        res.status(200).json(menuItem);
    } catch (error) {
        logger.error("Error fetching menu item by itemId");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getMenuItemsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        logger.info("Fetching menu items by category");

        const menuItems = await MenuItem.find({ category }).lean();
        logger.info("Menu items fetched successfully by category");
        res.status(200).json(menuItems);
    } catch (error) {
        logger.error("Error fetching menu items by category");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getAvailableMenuItems = async (req, res) => {
    try {
        logger.info("Fetching menu items by availability");

        const menuItems = await MenuItem.find({ availability: true }).lean();
        logger.info("Menu items fetched successfully by availability");
        res.status(200).json(menuItems);
    } catch (error) {
        logger.error("Error fetching menu items by availability");
        res.status(500).json({ msg: "Server error" });
    }
};