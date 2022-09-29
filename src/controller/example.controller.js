require('dotenv').config();
// const { Client, BundleHelper } = require("blueink-js/src/blueink/index");


const examples = {};

const privateApiKey = process.env.PRIVATE_API_KEY;

// const client = new Client(privateApiKey);

examples.fileUpload = async (req, res) => {
    if (req.method === "POST") {
		// const bh = new BundleHelper({
		// 	label: 'New Bundle Label',
		// 	requester_email: '',
		// 	requester_name: '',
		// 	email_subject: 'New Bundle From JS Library',
		// 	email_message: 'Please sign example document from Example JS '
		// })
        // client.bundles.create()
    }

    if (req.method === "GET") {
        res.render("upload");
    }
};

module.exports = examples;
