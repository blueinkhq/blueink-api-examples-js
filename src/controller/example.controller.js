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
            const { name, email } = req.body;

            const bh = new BundleHelper({
                label: "New Bundle Label not convert from buffer",
                requester_email: "example@email.com",
                requester_name: "Mr. Example",
                email_subject: "New Bundle From JS Library",
                email_message: "Please sign example document from Example JS ",
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

        const { name, email, company, title, superhero } = req.body;

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
                name,
                email,
                deliver_via: "embed",
            });

            bh.assignRole(signer, templateKey, "signer-1");

            bh.initializeField(templateKey, "inp001-SzYYb", name);

            if (company) {
                bh.initializeField(templateKey, "inp002-_4AG5", company);
            }

            if (title) {
                bh.initializeField(templateKey, "inp003-eMYsa", title);
            }

            if (superhero) {
                bh.initializeField(templateKey, "inp004-q2G4Y", superhero);
            }

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
            const { file_b64, name, email, company, title, superhero } =
                req.body;

            const bh = new BundleHelper({
                label: "New Bundle Label not convert from buffer",
                requester_email: "example@email.com",
                requester_name: "Mr. Example",
                email_subject: "New Bundle From JS Library",
                email_message: "Please sign example document from Example JS ",
            });

            const docKey = bh.addDocumentByB64(file_b64);

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
