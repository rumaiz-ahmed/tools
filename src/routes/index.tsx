import { createFileRoute } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <div>
      <h1>Home</h1>
      <Sparkles />
    </div>
  );
}
