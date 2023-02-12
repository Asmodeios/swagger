## Usage

Install the dependencies:

```sh
npm install
```

Run dev server:

```sh
npm run dev
```

## Run Cypress tests

Unit tests(without browser):

```sh
npm run cy:run-unit
```

Unit tests(with browser):

```sh
npm run cy:open-unit
```

E2E tests(without browser):

```sh
npm run cy:run-e2e
```

E2E tests(with browser):

```sh
npm run cy:open-e2e
```

## Production version

To generate the production version, you can run:

```sh
npm run build
```

All files you have to deploy will be located at the `dist` directory.

### Run production version locally

To check if everything will be ok in production before the deployment, you can run this command after `npm build`:

```sh
npm preview
```
