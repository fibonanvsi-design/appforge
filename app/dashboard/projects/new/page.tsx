'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const templates = [
  { id: 'blank', name: 'Blank App', framework: 'react', description: 'Start from scratch' },
  { id: 'react', name: 'React', framework: 'react', description: 'React with Vite' },
  { id: 'nextjs', name: 'Next.js', framework: 'nextjs', description: 'Full-stack React framework' },
  { id: 'vue', name: 'Vue', framework: 'vue', description: 'Progressive JavaScript framework' },
  { id: 'static', name: 'Static HTML', framework: 'html', description: 'HTML, CSS, JavaScript' },
  { id: 'landing', name: 'Landing Page', framework: 'nextjs', description: 'Marketing landing page' },
  { id: 'dashboard', name: 'Dashboard', framework: 'nextjs', description: 'Admin dashboard template' },
  { id: 'saas', name: 'SaaS Starter', framework: 'nextjs', description: 'SaaS application starter' },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('react');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName,
          framework: selectedTemplate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create project');
        return;
      }

      router.push(`/dashboard/editor/${data.project.id}`);
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">Create New Project</h1>

        <div className="mb-8 flex gap-4">
          <div className={`flex-1 h-2 rounded ${step >= 1 ? 'bg-blue-600' : 'bg-gray-700'}`} />
          <div className={`flex-1 h-2 rounded ${step >= 2 ? 'bg-blue-600' : 'bg-gray-700'}`} />
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="my-awesome-app"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!projectName.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Choose Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.framework)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedTemplate === template.framework
                        ? 'border-blue-600 bg-blue-600/10'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{template.description}</p>
                    <span className="text-xs text-gray-500">{template.framework}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCreate}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {isLoading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
