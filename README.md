# Koodikrapula.fi

Made with Twind and 11ty.

## Development mode

1. `npm install`
2. `npm start`
3. Open [localhost:8080](http://localhost:8080/)

In VS Code,
open the command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>),
choose "Extensions: Show Recommended Extensions"
and install the recommended extensions.

If you get errors like "Cannot find module `'$/data/char'`,"
re-run `npm install`.
(The `postinstall` script will automatically setup [Basetag][basetag]
for absolute import paths.)

[basetag]: https://github.com/janniks/basetag
