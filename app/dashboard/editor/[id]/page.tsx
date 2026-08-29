'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Editor from '@monaco-editor/react';
import { FiSave, FiPlay, FiPackage, FiFolder, FiFile, FiChevronRight, FiChevronDown } from 'react-icons/fi';

interface FileNode {
  id: string;
  path: string;
  content: string;
  isDirectory?: boolean;
  children?: Record<string, FileNode>;
}

interface Project {
  id: string;
  name: string;
  framework: string;
  files: Array<{ id: string; path: string; content: string }>;
}

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<Record<string, FileNode>>({});
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [activeContent, setActiveContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['']));

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      
      if (res.ok) {
        setProject(data.project);
        const fileTree = buildFileTree(data.project.files);
        setFiles(fileTree);
        
        if (data.project.files.length > 0) {
          const firstFile = data.project.files[0];
          setActiveFile(firstFile.path);
          setActiveContent(firstFile.content);
        }
      }
    } catch (error) {
      console.error('Failed to load project:', error);
    }
  };

  const buildFileTree = (fileList: Array<{ id: string; path: string; content: string }>): Record<string, FileNode> => {
    const root: Record<string, FileNode> = {};

    fileList.forEach(file => {
      const parts = file.path.split('/');
      let current = root;

      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = {
            id: file.id,
            path: file.path,
            content: file.content,
          };
        } else {
          if (!current[part]) {
            current[part] = {
              id: parts.slice(0, index + 1).join('/'),
              path: parts.slice(0, index + 1).join('/'),
              content: '',
              isDirectory: true,
              children: {},
            };
          }
          if (!current[part].children) {
            current[part].children = {};
          }
          current = current[part].children!;
        }
      });
    });

    return root;
  };

  const handleSave = async () => {
    if (!activeFile) return;

    setIsSaving(true);
    try {
      await fetch(`/api/projects/${projectId}/files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: activeFile,
          content: activeContent,
        }),
      });
    } catch (error) {
      console.error('Failed to save file:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBuild = async () => {
    setIsBuilding(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/build`, {
        method: 'POST',
      });
      const data = await res.json();
      
      if (res.ok) {
        setPreviewUrl(data.previewUrl);
      }
    } catch (error) {
      console.error('Build failed:', error);
    } finally {
      setIsBuilding(false);
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/deploy`, {
        method: 'POST',
      });
      const data = await res.json();
      
      if (res.ok) {
        alert('Deployment started! Check the deployments page for status.');
      }
    } catch (error) {
      console.error('Deploy failed:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleFileClick = (file: FileNode) => {
    if (file.isDirectory) {
      const newExpanded = new Set(expandedFolders);
      if (newExpanded.has(file.path)) {
        newExpanded.delete(file.path);
      } else {
        newExpanded.add(file.path);
      }
      setExpandedFolders(newExpanded);
    } else {
      setActiveFile(file.path);
      setActiveContent(file.content);
    }
  };

  const renderFileTree = (nodes: Record<string, FileNode>, depth = 0) => {
    const sortedNodes = Object.values(nodes).sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.path.localeCompare(b.path);
    });

    return sortedNodes.map(node => (
      <div key={node.path}>
        <div
          onClick={() => handleFileClick(node)}
          className={`flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-800 ${
            activeFile === node.path ? 'bg-gray-800 text-blue-400' : 'text-gray-300'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {node.isDirectory ? (
            <>
              {expandedFolders.has(node.path) ? (
                <FiChevronDown className="text-sm" />
              ) : (
                <FiChevronRight className="text-sm" />
              )}
              <FiFolder className="text-sm" />
            </>
          ) : (
            <FiFile className="text-sm ml-4" />
          )}
          <span className="text-sm">{node.path.split('/').pop()}</span>
        </div>
        {node.isDirectory && node.children && expandedFolders.has(node.path) && (
          <div>{renderFileTree(node.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  const getLanguage = (filename: string) => {
    const ext = filename.split('.').pop();
    const langMap: Record<string, string> = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      json: 'json',
      html: 'html',
      css: 'css',
      md: 'markdown',
    };
    return langMap[ext || ''] || 'plaintext';
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gray-400 hover:text-white"
          >
            ← Back
          </button>
          <h1 className="text-lg font-semibold text-white">{project.name}</h1>
          <span className="text-sm text-gray-500">{project.framework}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving || !activeFile}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
          >
            <FiSave />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleBuild}
            disabled={isBuilding}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
          >
            <FiPlay />
            {isBuilding ? 'Building...' : 'Preview'}
          </button>
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
          >
            <FiPackage />
            {isDeploying ? 'Deploying...' : 'Deploy'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto">
          <div className="p-3 border-b border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400 uppercase">Files</h3>
          </div>
          <div className="py-2">
            {renderFileTree(files)}
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            {activeFile ? (
              <>
                <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 text-sm text-gray-400">
                  {activeFile}
                </div>
                <Editor
                  height="100%"
                  language={getLanguage(activeFile)}
                  value={activeContent}
                  onChange={(value) => setActiveContent(value || '')}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    padding: { top: 16 },
                  }}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a file to edit
              </div>
            )}
          </div>

          <div className="w-96 bg-gray-900 border-l border-gray-800 flex flex-col">
            <div className="px-4 py-2 border-b border-gray-800">
              <h3 className="text-sm font-semibold text-gray-400 uppercase">Preview</h3>
            </div>
            <div className="flex-1 bg-white">
              {previewUrl ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-0"
                  title="Preview"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Click Preview to see your app
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
