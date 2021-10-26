# Koodikrapula.fi

Made with 11ty, Preact and Twind.

[Visit Koodikrapula.fi 👉][koodikrapula.fi]

## Development mode

1. `npm install`
2. `npm start`
3. Open [localhost:8080][localhost]

Other scripts:

- `npm run eslint`
- `npm run prettier`

Also, in VS Code:

1. Open the command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>)
2. Choose _"Extensions: Show Recommended Extensions"_
3. Install the recommended extensions

### Other tips

- [Run 'ESLint: Fix all auto-fixable Problems' on save](https://www.digitalocean.com/community/tutorials/workflow-auto-eslinting#step-4-%E2%80%93-adding-code-actions-on-save)

## Building for production

1. `npm install`
2. `npm run build`
3. Deploy the `_site` folder

[Koodikrapula.fi][koodikrapula.fi] is deployed on [Netlify][netlify].

- Netlify automatically rebuilds the site
  when a Pull Request is merged to master.
- GitHub Actions triggers a build every day at 06:00 AM (UTC),
  making it easy to schedule episode notes.

[koodikrapula.fi]: https://koodikrapula.fi/
[localhost]: http://localhost:8080/
[netlify]: https://www.netlify.com/
