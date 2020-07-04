<p align="center">
  <a href="https://www.seas.upenn.edu/~cis197/">
    <img alt="CIS 197" src="https://s3.amazonaws.com/riploventures/cis197.png" width="60" />
  </a>
</p>
<h1 align="center">
  CIS 197 Course Website
</h1>

In order to deploy the site, we effectively have to build it locally and push that version straight to the UPenn server. This is since you cannot run Node on UPenn's machines.

---

### Developing

Make sure that you are using Node version `10.x`. To switch node versions, we recommend using NVM. To run the site locally, run:

```bash
yarn dev
```

While developing, make sure you have [Prettier](https://prettier.io) configured on your code editor to build/lint on save. The style guide which Prettier abides by is outlined in the `.prettierrc` file at the root of this repo. This is a useful tool for not having debates over style and maintaining consistent style throughout the repo (and it works for `.js`, `.md`, ...).

---

### Git issues

One way that we do this (currently) is to push the `public/` directory to GitHub which can lead to some ugly merge conflicts of production build files which git struggles to deal with. If you run into really odd merge conflit hell, run:

```bash
rm -rf public .cache
```

This clears out Gatsby's production files and cached versions of files. These are rebuilt (to varying degrees) when development and production scripts are run.

---

### Deploying

Get a public and private SSH key for pushing to ENIAC from another CIS 197 instructor and place them in your `~/.ssh` folder with names `id_197` and `id_197.pub`. When these are set up, from the root of the repo for the website, run:

```bash
nvm use 10
./scripts/deploy.sh
```

When deploying, make sure that you are on the `master` branch. If the script complains that permissions on the keys are too open, run:

```bash
chmod 400 ~./ssh/id_197
```

To make it such that only you have permissions to read this file.

The deploy script effectively builds the files locally, pushes them to GitHub, rips an SSH into ENIAC, downloads the files from GitHub, then serves the static files.

---

### Architecture tidbits

Assignments and lectures are hidden via this stuff called "frontmatter." These are key-value fields specified at the top of a Markdown file which you can query via GraphQL via Gatsby's infrastructure. When rendering assignments and lectures, we specifically look for a field in the frontmatter called `hidden`, so we can flip this to `true` or `false` every week based on the assignments and lectures we want to expose.

The majority of the site content is written in Markdown and MDX. Most of these files are rendered with the same template, but some use different templates. For example, in `src/templates/Markdown.js` you'll see that we funnel all paths containing `"lecture"` to render with the `src/templates/Lecture.js` template.

We use Prism for syntax highlighting in code blocks.

MDX is a superset (kinda, as will be described) of Markdown which allows you to write React code (and use React components) from within Markdown files. This is super dope and generally works really well, excepting:

1. The Gatsby caching system can get mad at you. Sometimes when you import a component for the first time it will tell you that it's not defined. In this case you should restart your `yarn dev` jawn. Sometimes when you change _how_ a component is imported (like you change the path), the cache can become out of sync with the code. In this case, you should delete your cache:

   ```bash
   rm -rf public .cache
   ```

1. MDX does not like it when you are writing a multiline string in JS. Like at all. It will also get soooo confused if you have a comment or string in JavaScript which contains anything HTML-like. _To write a multiline string with an empty line, that line needs to have a space at the start of it._

1. MDX can't really interface well with Prism out of the box. For this reason, we made a `<Code />` component which handles this for us. It works pretty well but is a little more verbose than straight up markdown.
