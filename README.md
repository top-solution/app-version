# h1 app-version

Simple CLI tool to replace a properly configured version oject with the application version written in `package.json`.

To run the utility, simply add a tark after the `npm version` tool runs:

```
"scripts": {
  "postversion": "node node_modules/app-version src/main.ts"
},
```

This will replace the version object in the file `src/main.ts`:

```
...

const info = {            // <-- this will be replaced
  name: 'my-app',
  version: '1.0.11'
}

console.log(`${info.name} ${info.version}`);
window['appInfo'] = info;

...
```

Please remember to add a `.npmrc` in your directory to prevent git auto tagging and committing:

```
git-tag-version = false
```
