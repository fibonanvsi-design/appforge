export default function DomainsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Domains</h1>
        <p className="text-gray-400">Connect custom domains to your projects</p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Custom Domains</h3>
        <p className="text-gray-400 mb-4">
          Domain management will be available in Phase 2
        </p>
        <div className="text-sm text-gray-500">
          This feature will allow you to connect custom domains to your deployed applications
        </div>
      </div>
    </div>
  );
}
