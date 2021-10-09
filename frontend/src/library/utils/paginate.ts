import _ from "lodash";

export function paginate(items: Array<Object>, pageNumber: number, pageSize: number) {
	const index = pageSize * (pageNumber - 1);
	return _(items).slice(index).take(pageSize).value();
}
