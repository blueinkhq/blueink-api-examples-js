# BlueInk API Examples in JavaScript

This project contains examples of working with the 
[BlueInk eSignature API](https://blueink.com/esignature-api/) using
the [blueink-client-js](https://github.com/blueinkhq/blueink-client-js) 
library, and the [blueink-embed-js](https://github.com/blueinkhq/blueink-embed-js) 
library for embedded signings.

It is built using the Express server for basic web app functionality, 
but any JavaScript framework will work when using the blueink-client-js
library (or no framework at all).

The actual BlueInk API related code is in `src/controller/example.controller.js`.
Look there first for examples.

## Getting Started

This project is built to be run locally, or to be deployed to Render.
It can be run in other environments, but those are not documented.

### Download the Project and Run it Locally

First, clone the repo and install dependencies.
(Make sure you have NodeJS and npm installed.)
```bash
$ git clone git@github.com:blueinkhq/blueink-api-examples-js.git
$ cd blueink-api-examples-js/
$ npm install
```

Next, you need to setup some environment variables. Create the file
`.env` in your favorite editor, and then add these values. Fill in the
<...> placeholders with real values.

```
BLUEINK_PUBLIC_API_KEY=<Your public API key, from your BlueInk Account>
BLUEINK_PRIVATE_API_KEY=<A private API key, from your Blueink Account>
TEMPLATE_ID=<A ID of Document Template, from your Blueink Doument Template Library>
```

The public API key and private API key are available in your BlueInk Account dashboard,
in the API section. The public API key always starts with `public_` is used in the frontend 
to identify your BlueInk Account. The private API key should always be kept secret. It is used
to make authenticated calls to the BlueInk API from the backend.

You are now ready to run the project locally using the Express server.
```bash
$ npm run server
```

## Getting Support

For code issues or questions with this project, please create an issue in this repo. 

Or if you currently have a Blueink account, you can
reach out to our API support team from within the BlueInk Dashboard.

## License

MIT
