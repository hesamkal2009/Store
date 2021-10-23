export const addCommas = (num: string) =>
	num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const removeNonNumeric = (num: string) =>
	num.toString().replace(/[^0-9]/g, "");
