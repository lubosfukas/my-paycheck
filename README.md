# My Paycheck

Paycheck calculator application using React and Next.js

Live demo: https://kalkulacka-zivnost.vercel.app/

-   [File structure](#file-structure)
-   [Installation](#installation)
-   [Development](#development)
-   [Built with](#built-with)


## File structure

```text
.
├── components          # Feature first grouped components
├── hooks               # Hooks used across whole application
├── pages               # Top level views
└── utils               # Tools and utilities
```

## Installation

Install latest LTS version of [Node](https://nodejs.org/en/).

Install latest version of yarn.

```bash
npm install -g yarn
```

Run postinstall script.

```bash
yarn postinstall
```

Install Visual Studio Code recommended extensions. Open Extensions tab and type `@recommended`. Install all of them.

Open any file with extension `.ts` or `.tsx`. Open command pallete. Look for `TypeScript: Select TypeScript Version...` option. Pick `Use Workspace Version` option.

Start the project.

```bash
yarn dev
```

## Development

Preferably in Visual Studio Code with ESLint and Prettier installed. Commits are written in [Conventional Commits](https://www.conventionalcommits.org/).

Scripts

```bash
yarn
yarn install
yarn dev
yarn lint
yarn lint:fix
yarn test
yarn test:watch
```

Build with

```bash
yarn build
```

Run the built app in production mode with

```bash
yarn start
```

## Built with

[React](https://reactjs.org/)

[Next](https://nextjs.org/)

[Create Next App](https://nextjs.org/docs/api-reference/create-next-app)

[Yarn 2 Zero-Installs](https://yarnpkg.com/features/zero-installs)

[Chakra](https://chakra-ui.com/)

[Emotion](https://emotion.sh/docs/introduction)

[React CountUp](https://www.npmjs.com/package/react-countup)

[Jest](https://jestjs.io/)

[React Testing Library](https://testing-library.com/)

[Trunk based development](https://trunkbaseddevelopment.com/)
