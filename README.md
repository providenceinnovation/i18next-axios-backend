This project was forked from [`i18next-fetch-backend`](https://github.com/i18next/i18next-xhr-backend) and adapted to use axios instead of `global.fetch`

# Introduction

This is a simple i18next backend to be used in the browser. It will load resources from a backend server using [axios](https://github.com/axios/axios).

# Getting started

This backend is most useful when `XMLHttpRequest` is not available, such as with Service Worker contexts or when running in a non-shimmed node server environment.

Wiring up:

```js
import i18next from 'i18next';
import axiosBackend from 'i18next-axios-backend';

i18next
  .use(axiosBackend)
  .init(i18nextOptions);
```

- As with all modules you can either pass the constructor function (class) to the i18next.use or a concrete instance.

## Backend Options

The same options supported by [i18next-xhr-backend](https://github.com/i18next/i18next-xhr-backend) are supported here, except for those used by `XMLHttpRequest`. Instead, you can provide an `init` option that will be provided to `axios`.

```js
{
  // path where resources get loaded from, or a function
  // returning a path:
  // function(lngs, namespaces) { return customPath; }
  // the returned path will interpolate lng, ns if provided like giving a static path
  loadPath: '/locales/{{lng}}/{{ns}}.json',

  // path to post missing resources
  addPath: 'locales/add/{{lng}}/{{ns}}',

  // parse data after it has been fetched
  // in example use https://www.npmjs.com/package/json5
  // here it removes the letter a from the json (bad idea)
  parse: function(data) { return data.replace(/a/g, ''); },

  // init option for fetch, for example
  init: {
    timeout: 1000,
    auth: {
      username: 'janedoe',
      password: 's00pers3cret'
    }
  }
}
```

Options can be passed in:

**preferred** - by setting options.backend in i18next.init:

```js
import i18next from 'i18next';
import axiosBackend from 'i18next-axios-backend';

i18next
  .use(axiosBackend)
  .init({
    backend: options
  });
```

on construction:

```js
  import AxiosBackend from 'i18next-axios-backend';
  const fetch = new AxiosBackend(null, options);
```

via calling init:

```js
  import AxiosBackend from 'i18next-axios-backend';
  const axiosBackend = new AxiosBackend();
  fetch.init(options);
```

# IE \<= 10 Support

Because of an [issue](https://github.com/babel/babel/issues/116) in how IE used to handle inheritance of static properties, the following is necessary in order to support the old browsers:

```js
import i18next from 'i18next';
import AxiosBackend from 'i18next-axios-backend';

AxiosBackend.type = 'backend';

i18next
  .use(AxiosBackend)
  .init(/* ... */);
```
