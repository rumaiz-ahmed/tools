import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { UnitConverterTool } from '@/tools/unit-converter';

export const Route = createFileRoute('/tools/unit-converter')({
  component: UnitConverterPage,
});

function UnitConverterPage() {
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
        <UnitConverterTool />
      </div>
    </div>
  );
}
