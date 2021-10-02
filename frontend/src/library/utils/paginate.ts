import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
	const index = pageSize * (pageNumber - 1);
	return _(items).slice(index).take(pageSize).value();
}
