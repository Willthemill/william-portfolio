# William Paul – Portfolio (DE/EN)

Static site, no build step.

```
public/
  index.html        markup + German default text (SEO)
  styles/main.css   design tokens, layout, dark/light, animations
  src/main.js       DE/EN switch, theme toggle, rendering, mailto form
  src/content.js    all texts in German and English
  assets/favicon.svg
netlify.toml        publish = "public"
```

## Deploy
- Drag the folder onto app.netlify.com/drop, or
- Push to GitHub, then in Netlify: Add new site, Import from Git, publish directory `public`, build command empty.

Edit texts in `public/src/content.js` (and the German hero text in `index.html`).
