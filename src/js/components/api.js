export default class Api {
	/**
	 * @param {any} data
	 */
	async sendRequest(data) {
		const res = await fetch('https://pass.kakdoma.life/data/presentation', {
			method: 'POST',
			body: data
		});

		const json = await res.json();

		return json['status'] == 1;
	}
}
