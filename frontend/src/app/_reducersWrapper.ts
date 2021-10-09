import { combineReducers } from "redux";
import foodCategory from "./foodCategorySlice";
import food from "./foodSlice";

export default combineReducers({
	food,
	foodCategory,
});
