const data = require("../data/config")

function find() {
	return data("accounts").select("id", "user_name")
}

module.exports = {
	find
}