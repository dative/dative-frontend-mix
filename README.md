# Dative Front-End Starter

Front-end tool to build static site from [Twig](https://twig.symfony.com) templates, built using [Laravel Mix](https://laravel-mix.com). It uses [TailwindCSS](https://tailwindcss.com) for utility first styling.

It uses Node v16.14.2 (I recommend using [NVM](https://github.com/nvm-sh/nvm))

## Usage

After cloning, install the dependencies using:

```bash
$ npm install
```

### Commands

#### npm run dev

This will fire up the local development, with live reload. It will run on [`http://localhost:3030`](http://localhost:3030)

#### npm run build

This will build the production version of the site inside the `public` directory.

## Development Guidelines

While working on this project, here are some helpful advice when choosing the implementation path:

[Convetions](#convetions)

[Lean on Tailwind](#lean-on-tailwind)

[Use TWIG to encapsulate page components](#use-twig-to-encapsulate-page-components)

### Conventions

Inside the `./src` directory, we have `assets` and `templates`:

    .
    ├── ...
    ├── src
    │   ├── css
    │   │   ├── components
    │   │   ├── pages
    │   │   ├── app.css
    │   │   └── vendor.css
    │   ├── img
    │   └── js
    │   │   ├── ...
    │   │   ├── app.ts
    │   │   └── ...
    │   └── templates
    │       ├── _boilerplate
    │       ├── _layouts
    │       ├── _partials
    │       ├── ...
    │       ├── page.twig
    │       └── ...
    └── ...

| File / Directory        | Description                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| css                     | Website style configurations                                                                                                 |
| css/components          | Styles for specific components                                                                                               |
| css/pages               | Styles for specific pages                                                                                                    |
| css/app.css             | Main style file                                                                                                              |
| css/vendor.css          | Vendor specific styles, when importing from node_modules isn't available                                                     |
| img                     | Website images                                                                                                               |
| js                      | Website scripts                                                                                                              |
| js/app.ts               | Main script file (Typescript)                                                                                                |
| templates/\_boilerplate | Base tem­plat­ing set­up for our Twig tem­plates that pro­vides a sta­ble, sol­id foun­da­tion on which to build our project |
| templates/\_layouts     | TWIG layout files to be extended by a template page                                                                          |
| templates/\_patials     | TWIG include files to be used by a template                                                                                  |
| templates/page.twig     | TWIG base template that can be duplicated to create other pages                                                              |

#### Notes

- TWIG files starting with **\_** (underscore) won't generate HTML files, but they can be used by other TWIG files.
- Scripts should be written in [Typescript](https://www.typescriptlang.org)

### Lean on Tailwind

Avoid writing css components, unless you have to.

Traditionally, whenever you need to style something on the web, you write CSS. For Example:

```html
<div class="chat-notification">
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>
<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

With Tailwind, you style elements by applying pre-existing classes directly in your HTML.

```html
<div
  class="flex items-center max-w-sm p-6 mx-auto space-x-4 bg-white shadow-lg rounded-xl"
>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```

This approach allows us to implement a completely custom component design without writing a single line of custom CSS.

Once you’ve actually built something this way, you’ll notice some really important benefits:

**You aren’t wasting energy inventing class names.** No more adding silly class names like `sidebar-inner-wrapper` just to be able to style something, and no more agonizing over the perfect abstract name for something that’s really just a flex container.

**Your CSS stops growing.** Using a traditional approach, your CSS files get bigger every time you add a new feature. With utilities, everything is reusable so you rarely need to write new CSS.

**Making changes feels safer.** CSS is global and you never know what you’re breaking when you make a change. Classes in your HTML are local, so you can change them without worrying about something else breaking.

Besides the benefits to the developer experience, our build process removes any unused styles, reducing the overall size of the CSS and boosting the performance of the page.

### Use TWIG to encapsulate page components

Keep your code DRY (Don't Repeat Yourself) by using [`{% include %}`](https://twig.symfony.com/doc/3.x/tags/include.html) to encapsulate the code. Take the following code:

```html
<div
  class="flex items-center max-w-sm p-6 mx-auto space-x-4 bg-white shadow-lg rounded-xl"
>
  <div>
    <div class="text-xl font-medium text-black">Mary</div>
    <p class="text-slate-500">First message!</p>
  </div>
</div>

<div
  class="flex items-center max-w-sm p-6 mx-auto space-x-4 bg-white shadow-lg rounded-xl"
>
  <div>
    <div class="text-xl font-medium text-black">Joe</div>
    <p class="text-slate-500">Second message!</p>
  </div>
</div>
```

We can extract the "Message" into a TWIG partial in `_partials/_message.twig`:

```twig
<div
  class="flex items-center max-w-sm p-6 mx-auto space-x-4 bg-white shadow-lg rounded-xl"
>
  <div>
    <div class="text-xl font-medium text-black">{{name|default("USER")}}</div>
    <p class="text-slate-500">{{message|default("MESSAGE")}}</p>
  </div>
</div>
```

Now we can reference it in our code:

```twig
{% include "_partials/_message.twig" with {
  name: "Mary",
  message: "First message!"
} %}

{% include "_partials/_message.twig" with {
  name: "Joe",
  message: "Second message!"
} %}
```

This way, the component can be easily maintained!

## Contribution

Before submitting your contribution, please make sure to take a moment and read through the following guide:

- We follow the [Fork and pull model](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/about-collaborative-development-models#fork-and-pull-model)
- We "loosely" follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) to commit messages.
- If adding a new feature or page
  - Add accompanying summary.
- If fixing bug:
  - If you are resolving a special issue, add (fix #xxxx[,#xxxx]) (#xxxx is the issue id) in your PR title for a better release log, e.g. fix: update entities encoding/decoding (fix #3899).
  - Provide a detailed description of the bug in the PR. Live demo preferred, but screen shots are also welcomed.
  - It's OK to have multiple small commits as you work on the PR - GitHub can automatically squash them before merging.
  - **Make sure you test your code locally first!**
  - No need to worry about code style as long as you have installed the dev dependencies - modified files are automatically formatted with Prettier on commit (by invoking Git Hooks via yorkie).

### Notes on Dependencies

This project aims to deliver a lightweight website, and this includes being aware of the number of npm dependencies and their size.

**Think before adding a dependency.** Is it worth it? Can it be achieve with a few lines of code instead?

**Think before adding yet another option.** We should avoid fixing an issue by adding yet another one. Before adding an option, try to think about:

- Whether the problem is really worth addressing
- Whether the problem can be fixed with a smarter default
- Whether the problem has workaround using existing options
- Whether the problem can be addressed with a plugin instead
