import { writable } from 'svelte/store';

export const toasts: any = writable([]);

export const addToast = (toast: any) => {
	const id = Math.floor(Math.random() * 10000);
	const defaults = {
		id,
		type: 'info',
		dismissible: false,
		timeout: 3000,
		position: 'top-center'
	};
	toasts.update((all: any) => [{ ...defaults, ...toast }, ...all]);
	if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: any) => {
	toasts.update((all: any) => all.filter((t: any) => t.id !== id));
};
