import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { TextToolsTool } from '@/tools/text-tools';
import { AdContainer } from '@/components/adsterra-ad';

export const Route = createFileRoute('/tools/text-tools')({
  component: TextToolsPage,
});

function TextToolsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Tools
          </Link>
        </div>
      </div>
      <AdContainer />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <TextToolsTool />
      </div>
      <AdContainer />
    </div>
  );
}
