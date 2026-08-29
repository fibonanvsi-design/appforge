export default function TemplatesPage() {
  const templates = [
    {
      id: 'landing',
      name: 'Landing Page',
      framework: 'Next.js',
      description: 'Modern landing page template with hero, features, and CTA sections',
      category: 'Marketing',
    },
    {
      id: 'dashboard',
      name: 'Admin Dashboard',
      framework: 'React',
      description: 'Full-featured admin dashboard with charts and tables',
      category: 'Admin',
    },
    {
      id: 'saas',
      name: 'SaaS Starter',
      framework: 'Next.js',
      description: 'Complete SaaS application starter with authentication and billing',
      category: 'SaaS',
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      framework: 'Next.js',
      description: 'Personal portfolio website template',
      category: 'Personal',
    },
    {
      id: 'blog',
      name: 'Blog',
      framework: 'Next.js',
      description: 'Blog template with markdown support',
      category: 'Content',
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      framework: 'Next.js',
      description: 'E-commerce store with product catalog and cart',
      category: 'E-commerce',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Templates</h1>
        <p className="text-gray-400">Start with a pre-built template</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all group"
          >
            <div className="mb-4">
              <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded border border-blue-500/30 mb-2">
                {template.category}
              </span>
              <h3 className="text-lg font-semibold text-white mb-1">
                {template.name}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{template.description}</p>
              <span className="text-xs text-gray-500">{template.framework}</span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Use Template
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors">
                Preview
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
              Coming Soon - Template functionality will be available in Phase 2
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
