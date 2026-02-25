import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { URLShortenerTool } from '@/tools/url-shortener';

export const Route = createFileRoute('/tools/url-shortener')({
  component: URLShortenerPage,
});

function URLShortenerPage() {
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
      <div className="max-w-6xl mx-auto px-6 py-8">
        <URLShortenerTool />
      </div>
    </div>
  );
}
