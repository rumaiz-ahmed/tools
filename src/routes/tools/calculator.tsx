import { createFileRoute, Link } from '@tanstack/react-router';
import { CalculatorTool } from '@/tools/calculator';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export const Route = createFileRoute('/tools/calculator')({
  component: CalculatorPage,
});

// Adsterra Ad Component
function AdContainer() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://pl28795298.effectivegatecpm.com/624ee3b4a4d6c3a00b4dc1768a217df6/invoke.js';
    script.setAttribute('data-cfasync', 'false');
    document.head.appendChild(script);

    return () => {
      const existingScript = document.head.querySelector(
        `script[src="${script.src}"]`,
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="my-6 flex justify-center">
      <div id="container-624ee3b4a4d6c3a00b4dc1768a217df6" />
    </div>
  );
}

function CalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Tools
          </Link>
        </div>
      </div>

      {/* Ad */}
      <AdContainer />

      {/* Tool */}
      <div className="container mx-auto px-4 py-4">
        <CalculatorTool />
      </div>

      {/* Ad */}
      <AdContainer />
    </div>
  );
}
