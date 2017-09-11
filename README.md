# TypeScript Template Project.

## How to use.

```
$ git clone git@github.com:wooyaggo/typescript.git
```

then you need to install packages for project and global.

```
$ npm run init
```


## Using

### 1. Debug (Visual Studio Code)

Press 'F5'.

So automatically execute ```tsc``` and ```launch``` via <code>./vscode/launch.json</code> configuration.

### 2. Debugging with PM2

```
$ npm run dev
```

or

```
$ pm2 start pm2.config.js
```

to run project with pm2.

Press Ctrl + D to show debug panel.

Choose ```Debug PM2``` on debug configurations.

then press 'F5'.

Debugger will attach to pm2 process.