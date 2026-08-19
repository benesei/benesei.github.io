# Benedikt Seiter

Source for [benesei.github.io](https://benesei.github.io), a minimal personal academic website built with Jekyll and al-folio.

## Editing the site

- Homepage: `_pages/about.md`
- Publications: `_bibliography/papers.bib`
- Social links: `_data/socials.yml`
- Profile photo: `assets/img/prof_pic.jpg`
- Site settings: `_config.yml`

## Local development

```bash
bundle install
bundle exec jekyll serve
```

The site is available at <http://localhost:4000>. Pushes to `main` are deployed automatically with GitHub Actions.

The site uses the [al-folio](https://github.com/alshedivat/al-folio) starter under the MIT License.
