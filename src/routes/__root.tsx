import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SupportModalProvider } from '@/components/support-modal';
import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Tools - Free Online Utilities' },
      {
        name: 'description',
        content:
          'A collection of free online tools including calculator, unit converter, text tools, JSON formatter, and more. No sign-ups required.',
      },
      {
        name: 'keywords',
        content:
          'free tools, online calculator, unit converter, text tools, json formatter, color converter',
      },
      { property: 'og:title', content: 'Tools - Free Online Utilities' },
      {
        property: 'og:description',
        content:
          'A collection of free online tools to make everyday tasks easier.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'theme-color', content: '#6366f1' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  const schemaData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Tools',
    description:
      'A collection of 10 free online utilities including calculator, unit converter, text tools, JSON formatter, and more.',
    url: 'https://tools.mndly.workers.dev',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  });

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaData }}
        />
      </head>
      <body className="antialiased">
        <TooltipProvider>
          <SupportModalProvider>{children}</SupportModalProvider>
        </TooltipProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
