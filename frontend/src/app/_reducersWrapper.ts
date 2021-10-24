import { combineReducers } from "redux";
import foodCategory from "./foodCategorySlice";
import food from "./foodSlice";
import cart from "./cartSlice";

export default combineReducers({
	food,
	foodCategory,
	cart,
});
