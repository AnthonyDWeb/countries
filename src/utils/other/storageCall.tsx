export const clearStorage = () => localStorage.clear();
export const setStorage = (key: string, value: any) =>
	localStorage.setItem(key, JSON.stringify(value));
export const getStorage = (key: string) => JSON.parse(localStorage.getItem(key)!);
export const removeStorage = (key: string) => localStorage.removeItem(key);
