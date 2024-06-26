import { writable } from 'svelte/store';
import { dataSource } from '$lib/dataSource';

const dataStore: any = writable(dataSource);

export default dataStore;
