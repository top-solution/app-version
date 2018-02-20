# app-version

Simple CLI tool to replace a properly configured version object in a specified file with the latest application version, written in `package.json`. When the replacement is done, `package.json`, `package-lock.json` and the modified file will be git-committed and tagged with the version number.

To run the utility, simply add a task in the `package.json`:

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

After updating the version, using `npm version` like this:

```
npm version patch
```

this script will create a commit with the text `Released version 1.0.12` and the tag `v1.0.12`.
