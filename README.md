# 🛠️ Open Tools

A collection of free online tools built by the community, for the community.

## 🌟 About

Open Tools is an open source project dedicated to building useful online utilities that anyone can use for free. We're just getting started, but we have big plans to create a comprehensive suite of tools to make everyday tasks easier.

**Our mission:** Build high-quality, accessible online tools that are free for everyone to use.

## 🤝 Contributing

We welcome contributions from everyone! Whether you're fixing bugs, adding new tools, improving documentation, or suggesting ideas - your help is appreciated.

### How to Contribute

1. Fork this repository
2. Create a new branch for your feature
3. Make your changes
4. Test your changes thoroughly
5. Submit a pull request

### Adding New Tools

- Each tool should have its own route in `src/routes/`
- Follow the existing code patterns and styling
- Add documentation for your tool
- Ensure it works well on both desktop and mobile

## 🚀 Getting Started

To run this application locally for development:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

## 📦 Available Tools

_We're just getting started! Check back soon as we add more tools._

- _Coming soon..._

## 🛠️ Tech Stack

- **Framework:** TanStack Start
- **UI:** React with TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest
- **Build Tool:** Vite

## 🏗️ Development Guide

### Building For Production

To build this application for production:

```bash
npm run build
```

### Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

### Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

#### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Uninstall the packages: `npm install @tailwindcss/vite tailwindcss -D`

### Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

#### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

#### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from '@tanstack/react-router';
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

#### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
});
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

### Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start';

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString();
});

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('');

  useEffect(() => {
    getServerTime().then(setTime);
  }, []);

  return <div>Server time: {time}</div>;
}
```

### API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
});
```

### Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people');
    return response.json();
  },
  component: PeopleComponent,
});

function PeopleComponent() {
  const data = Route.useLoaderData();
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  );
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌐 Community

- **Issues:** [Report bugs and request features](../../issues)
- **Discussions:** [Join our community discussions](../../discussions)
- **Contributors:** [See our amazing contributors](../../graphs/contributors)

## 🙏 Acknowledgments

Thanks to the [TanStack](https://tanstack.com/) team for providing the excellent framework that powers this project.

---

**Built with ❤️ by the open source community**
