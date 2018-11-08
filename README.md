## Introduction

[retrospection-board](https://gitlab.ascentio.com.ar/canopus-team/retro-board/retrospection-board) make more fun the Retrospective . It based on [vue](https://github.com/vuejs/vue) and [vue-element-admin](http://panjiachen.github.io/vue-element-admin)  and use the UI Toolkit [element](https://github.com/ElemeFE/element).

**This project does not support low version browsers (e.g. IE). Please add polyfill yourself if you need them.**

## Preparation

You need to install [node](http://nodejs.org/) and [git](https://git-scm.com/) locally. The project is based on [ES2015+](http://es6.ruanyifeng.com/), [vue](https://cn.vuejs.org/index.html), [vuex](https://vuex.vuejs.org/zh-cn/), [vue-router](https://router.vuejs.org/zh-cn/), [yarn](https://yarnpkg.com/en/), [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element), all request data is simulated using [Mock.js](https://github.com/nuysoft/Mock).
Understanding and learning this knowledge in advance will greatly help the use of this project.

## Getting started

```bash
# clone the project
git clone git@gitlab.ascentio.com.ar:canopus-team/retro-board/retrospection-board.git

# install dependency
yarn

# develop
yarn dev
```

This will automatically open http://localhost:9527.

## Build

```bash
# build for test environment
yarn build:sit

# build for production environment
yarn build:prod
```

## Advanced

```bash
# --report to build with bundle size analytics
yarn build:prod --report

# --generate a bundle size analytics. default: bundle-report.html
yarn build:prod --generate_report

# --preview to start a server in local to preview
yarn build:prod --preview

# lint code
yarn lint

# auto fix
yarn lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## Configuration

At the moment, it board use [Firebase](https://firebase.google.com/). Is necessary configure you own database to use, for it, you must create a file into the src folder with name config.js and content like the next:

```json
export const firebaseConfig = {
  apiKey: '<apiKey>',
  authDomain: '<authDomain>',
  databaseURL: '<databaseURL>',
  projectId: '<projectId>',
  storageBucket: '<storageBucket>',
  messagingSenderId: '<messagingSenderId>'
}

export const firebaseBoardPath = '<firebaseBoardPath>'
```

Replace tags between <>  in firebaseConfig by the values given by Firebase and set firebaseBoardPath with the name of the database created

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
