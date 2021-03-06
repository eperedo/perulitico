import fetch from 'node-fetch';
const BASE_URL = process.env.API_URL;
const SEARCH_URL = 'polls';

async function parseToJson(response) {
	const json = await response.json();
	return json;
}

export async function getPolls(searchTerm, dateTerm) {
	const response = await window.fetch(
		`${BASE_URL}/${SEARCH_URL}?search=${searchTerm}&date=${dateTerm}`,
	);
	return parseToJson(response);
}

export async function getPollDetails(slug) {
	const response = await fetch(`${BASE_URL}/${SEARCH_URL}/${slug}`);
	return parseToJson(response);
}

export async function getPoliticians() {
	const response = await window.fetch(`${BASE_URL}/politicians`);
	return parseToJson(response);
}

export async function getPoliticianBySlug(slug) {
	const response = await fetch(`${BASE_URL}/politicians/${slug}`);
	return parseToJson(response);
}

export async function getEvents(slug, from, to) {
	const response = await window.fetch(
		`${BASE_URL}/politicians/${slug}/1/events?page=${from}&limit=${to}`,
	);

	return parseToJson(response);
}
