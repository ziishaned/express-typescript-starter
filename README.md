# express-typescript-starter

> A starting point for Node.js express apps with TypeScript

### Getting started

1. Clone the repository by running following command:

```bash
git clone git@github.com:ziishaned/express-typescript-starter.git
```

2. Install dependencies by running following command inside terminal:

```bash
npm install
# or
yarn install
```

3. Run the following command and create configuration file:

```bash
cp .env.example .env
```

4. Run the dev server:

```bash
npm run watch
# or
yarn run watch
```

### Test

Run the following command inside your terminal to run tests:

```bash
npm run test
# or
yarn run test
```

### Changelog

For generating changelog you must have to install `git-chglog` by running following command:

```bash
brew tap git-chglog/git-chglog
brew install git-chglog
```

To generate changelog run the following command at the root of this project:

```bash
npm run gen-chglog
```
