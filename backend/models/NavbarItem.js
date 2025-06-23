import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String },
  visible: { type: Boolean, default: true },
});

const SubmenuSectionSchema = new mongoose.Schema({
  heading: { type: String },
  links: [LinkSchema],
});

const SubmenuItemSchema = new mongoose.Schema({
  label: { type: String },
  href: { type: String },
  visible: { type: Boolean, default: true }
});

const NavbarItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, default: null },
  badge: { type: String, default: null },
  visible: { type: Boolean, default: true },
  submenu: {
    type: [SubmenuSectionSchema], // multi-section submenu (for complex menus)
    default: undefined
  },
  flatSubmenu: {
    type: [SubmenuItemSchema], // single flat submenu (like "Emily In Paris")
    default: undefined
  }
});

const NavbarItem = mongoose.model("NavbarItem", NavbarItemSchema);
export default NavbarItem;
