export default function AIBuilderPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Builder</h1>
        <p className="text-gray-400">Let AI help you build your application</p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Development</h3>
        <p className="text-gray-400 mb-4">
          AI Builder will be available in Phase 2
        </p>
        <div className="text-sm text-gray-500 max-w-2xl mx-auto">
          The AI Builder will help you create and modify applications using natural language.
          Simply describe what you want to build, and AI will generate the code for you.
        </div>
      </div>
    </div>
  );
}
