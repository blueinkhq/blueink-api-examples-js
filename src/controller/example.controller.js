require("dotenv").config();
const { Client, BundleHelper } = require("@blueink360/blueink-client-js");

const handleError = require('../util/util');

const BLUEINK_PUBLIC_API_KEY = process.env.BLUEINK_PUBLIC_API_KEY

const examples = {};

// Initialize Blueink Client
// The library will look for BLUEINK_PRIVATE_API_KEY in .env file in the local directory.
const client = new Client();

// Function for handling file upload and creating a new bundle with the uploaded file
// Renders the "upload" template with the signing URL for the uploaded document
examples.fileUpload = async (req, res) => {
    if (req.method === "POST") {
        try {
            const file = req.file;
            const { name, email } = req.body;

            const bh = new BundleHelper({
                label: "New Bundle from Uploaded File",
                requester_email: "example@email.com",
                requester_name: "Mr. Example",
                email_subject: "New Bundle From JS Library",
                email_message: "Please sign example document from Example JS ",
                is_test: true
            });

            const docKey = bh.addDocumentByFile(file);

            const signer = bh.addSigner({
                name,
                email,
                deliver_via: "embed",
            });

            const field = bh.addField(docKey, {
                label: "Your Name",
                page: 1,
                kind: "txt",
                editors: [signer],
                // initial_value: `Hello ${name}`, - Or we can use initializeValue method
                x: 15,
                y: 60,
                w: 20,
                h: 3,
            });

            bh.initializeField(docKey, field, `Hello ${name}`);

            const newBundle = await client.bundles.create(bh.asData());
            const packetId = newBundle.data.packets[0].id;

            const embedUrl = await client.packets.embedUrl(packetId);
            const { url } = embedUrl.data;

            res.render("upload", {  blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY, url });
        } catch (error) {
            handleError(error);
            res.status(400).render("upload", { blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY });
        }
    }

    if (req.method === "GET") {
        res.render("upload", { blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY });
    }
};

// Function for handling template-based Bundle creation
// Renders the "template" template with the signing URL for the template-based document
examples.template = async (req, res) => {
    if (req.method === "POST") {
        const TEMPLATE_ID = process.env.TEMPLATE_ID;

        const { name, email, company, title, superhero } = req.body;

        try {
            const bh = new BundleHelper({
                label: "New Bundle from Document Template",
                requester_email: "example@email.com",
                requester_name: "Mr. Example",
                email_subject: "New Bundle From JS Library",
                email_message: "Please sign example document from Example JS ",
            });

            const templateKey = bh.addDocumentTemplate({
                template_id: TEMPLATE_ID,
            });

            const signer = bh.addSigner({
                name,
                email,
                deliver_via: "embed",
            });

            bh.assignRole(signer, templateKey, "signer-1");

            bh.initializeField(templateKey, "inp002-vTTIY", name);

            if (company) {
                bh.initializeField(templateKey, "inp003-QnEwD", company);
            }

            if (title) {
                bh.initializeField(templateKey, "inp004-XPcpS", title);
            }

            if (superhero) {
                bh.initializeField(templateKey, "inp005-HFLXi", superhero);
            }

            const newBundle = await client.bundles.create(bh.asData());
            const packetId = newBundle.data.packets[0].id;

            const embedUrl = await client.packets.embedUrl(packetId);
            const { url } = embedUrl.data;

            res.render("template", {  blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY, url });
        } catch (error) {
            handleError(error);
            res.status(400).render("template", { blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY });
        }
    }

    if (req.method === "GET") {
        res.render("template", { blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY });
    }
};

// Function for handling Bundle creation from a URL
// Renders the "url" template with the signing URL for the document from the provided URL
examples.url = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { file_url } = req.body;

            const bh = new BundleHelper({
                label: "New Bundle from File URL",
                requester_email: "example@email.com",
                requester_name: "Mr. Example",
                email_subject: "New Bundle From JS Library",
                email_message: "Please sign example document from Example JS ",
            });

            const docKey = bh.addDocumentByUrl(file_url);

            const signer = bh.addSigner({
                name: "The Signer One",
                email: "peter.gibbons@example.com",
                deliver_via: "embed",
            });

            const field = bh.addField(docKey, {
                label: "Your Name",
                page: 1,
                kind: "txt",
                editors: [signer],
                x: 15,
                y: 60,
                w: 20,
                h: 3,
            });

            const newBundle = await client.bundles.create(bh.asData());
            const packetId = newBundle.data.packets[0].id;

            const embedUrl = await client.packets.embedUrl(packetId);
            const { url } = embedUrl.data;

            res.render("url", { blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY, url });
        } catch (error) {
            handleError(error);
            res.status(400).render("url", { blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY });
        }
    }

    if (req.method === "GET") {
        res.render("url", { blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY });
    }
};

// Function for handling document creation from base64 encoded data
// Renders the "b64" template with the signing URL for the base64 encoded document
examples.b64 = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { file_b64, name, email, company, title, superhero } =
            req.body;

            const bh = new BundleHelper({
                label: "New Bundle from Base 64",
                requester_email: "example@email.com",
                requester_name: "Mr. Example",
                email_subject: "New Bundle From JS Library",
                email_message: "Please sign example document from Example JS ",
            });

            const docKey = bh.addDocumentByB64("sample-doc", file_b64);

            const signer = bh.addSigner({
                name,
                email,
                deliver_via: "embed",
            });

            const nameField = bh.addField(docKey, {
                label: "Your Name",
                page: 1,
                kind: "txt",
                editors: [signer],
                x: 43.47,
                y: 76.04,
                w: 20,
                h: 1.5,
            });

            const companyField = bh.addField(docKey, {
                label: "Your Company",
                page: 1,
                kind: "txt",
                editors: [signer],
                x: 43.47,
                y: 72.39,
                w: 20,
                h: 1.5,
            });

            const titleField = bh.addField(docKey, {
                label: "Your Title",
                page: 1,
                kind: "txt",
                editors: [signer],
                x: 43.47,
                y: 68.87,
                w: 20,
                h: 1.5,
            });

            const heroField = bh.addField(docKey, {
                label: "Your favorite superhero",
                page: 1,
                kind: "txt",
                editors: [signer],
                x: 43.47,
                y: 65.23,
                w: 20,
                h: 1.5,
            });

            const initialField = bh.addField(docKey, {
                page: 1,
                kind: "ini",
                editors: [signer],
                x: 16.12,
                y: 53.92,
                w: 5,
                h: 3,
            });

            bh.initializeField(docKey, nameField, name);

            if (company) {
                bh.initializeField(docKey, companyField, company);
            }

            if (title) {
                bh.initializeField(docKey, titleField, title);
            }

            if (superhero) {
                bh.initializeField(docKey, heroField, superhero);
            }

            const newBundle = await client.bundles.create(bh.asData());
            const packetId = newBundle.data.packets[0].id;

            const embedUrl = await client.packets.embedUrl(packetId);
            const { url } = embedUrl.data;

            res.render("b64", { blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY, url });
        } catch (error) {
            handleError(error);
            res.status(400).render("b64", { blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY });
        }
    }

    if (req.method === "GET") {
        res.render("b64", { blueinkPublicApiKey: BLUEINK_PUBLIC_API_KEY });
    }
};

// Exporting the examples object containing all the functions for external use
module.exports = examples;
