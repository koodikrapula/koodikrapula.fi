# Koodikrapula.fi

Made with 11ty, Preact and Twind.

[Visit Koodikrapula.fi 👉][koodikrapula.fi]

## Development mode

1. `npm install`
2. `npm start`
3. Open [localhost:8080][localhost]

If you get errors like "Cannot find module `'$/data/char'`,"
rerun `npm install`.
(The `postinstall` script will automatically setup [Basetag][basetag]
which adds support for absolute import paths.)

In VS Code,
open the command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>),
choose "Extensions: Show Recommended Extensions"
and install the recommended extensions.

## Building for production

1. `npm install`
2. `npm run build`
3. Deploy the `_site` folder

[Koodikrapula.fi][koodikrapula.fi] is deployed on [Netlify][netlify].

- Netlify automatically rebuilds the site
  when a Pull Request is merged to master.
- GitHub Actions triggers a build every day at 06:00 AM (UTC),
  making it easy to schedule episode notes.

[basetag]: https://github.com/janniks/basetag
[koodikrapula.fi]: https://koodikrapula.fi/
[localhost]: http://localhost:8080/
[netlify]: https://www.netlify.com/
