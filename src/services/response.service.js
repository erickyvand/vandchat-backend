/**
 * Response service class
*/
class ResponseService {
	/**
	 * * @param  {string} message
	 * * @param  {integer} statusCode
	 * * @param  {object} data
	 * * @returns {object} function for a success response
	 */
	static setSuccess(statusCode, message, data) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.type = 'success';
	}

	/**
	 * * @param  {string} message
	 * * @param  {integer} statusCode
	 * * @returns {object} function for an error response
	 */
	static setError(statusCode, message) {
		this.statusCode = statusCode;
		this.message = message;
		this.type = 'error';
	}

	/**
	 * * @param  {object} res
	 * * @returns {object} function to send a response
	 */
	static send(res) {
		if (this.type === 'success') {
			return res.status(this.statusCode).json({
				status: this.statusCode,
				message: this.message,
				data: this.data,
			});
		}
		return res.status(this.statusCode).json({
			status: this.statusCode,
			message: this.message,
		});
	}
}

export default ResponseService;
