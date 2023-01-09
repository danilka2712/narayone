import { writable } from 'svelte/store';

export const address = writable([[], []]);
export const query = writable('');
export const query1 = writable('');
export const pogruzs = writable('0');

