require("dotenv").config();
const { Client, BundleHelper } = require("blueink-js");

const examples = {};

const LOCAL_URL = process.env.LOCAL_URL;
const LOCAL_KEY = process.env.LOCAL_KEY;

const client = new Client(LOCAL_KEY, LOCAL_URL);

examples.fileUpload = async (req, res) => {
    if (req.method === "POST") {
        try {
            const file = req.file;

            const bh = new BundleHelper({
                label: "New Bundle Label not convert from buffer",
                requester_email: "example@email.com",
                requester_name: "Mr. Example",
                email_subject: "New Bundle From JS Library",
                email_message: "Please sign example document from Example JS ",
            });

            const docKey = bh.addDocumentByFile(file);

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

            res.render("upload", { url });
        } catch (error) {
            res.render("upload");
        }
    }

    if (req.method === "GET") {
        res.render("upload");
    }
};

examples.template = async (req, res) => {
    if (req.method === "POST") {
        const TEMPLATE_ID = process.env.TEMPLATE_ID;

        try {
            const bh = new BundleHelper({
                label: "New Bundle Label not convert from buffer",
                requester_email: "example@email.com",
                requester_name: "Mr. Example",
                email_subject: "New Bundle From JS Library",
                email_message: "Please sign example document from Example JS ",
            });

            const templateKey = bh.addDocumentTemplate({
                template_id: TEMPLATE_ID,
            });

            const signer = bh.addSigner({
                name: "The Signer One",
                email: "peter.gibbons@example.com",
                deliver_via: "embed",
            });

            bh.assignRole(signer, templateKey, "signer-1");

            const newBundle = await client.bundles.create(bh.asData());
            const packetId = newBundle.data.packets[0].id;

            const embedUrl = await client.packets.embedUrl(packetId);
            const { url } = embedUrl.data;

            res.render("template", { url });
        } catch (error) {
            res.render("template");
        }
    }

    if (req.method === "GET") {
        res.render("template");
    }
};

examples.url = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { file_url } = req.body;

            const bh = new BundleHelper({
                label: "New Bundle Label not convert from buffer",
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

            res.render("url", { url });
        } catch (error) {
            res.render("url");
        }
    }

    if (req.method === "GET") {
        res.render("url");
    }
};

examples.b64 = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { file_b64 } = req.body;

            const bh = new BundleHelper({
                label: "New Bundle Label not convert from buffer",
                requester_email: "example@email.com",
                requester_name: "Mr. Example",
                email_subject: "New Bundle From JS Library",
                email_message: "Please sign example document from Example JS ",
            });

            const docKey = bh.addDocumentByB64(file_b64);

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

            res.render("b64", { url });
        } catch (error) {
            res.render("b64");
        }
    }

    if (req.method === "GET") {
        res.render("b64");
    }
};

module.exports = examples;
