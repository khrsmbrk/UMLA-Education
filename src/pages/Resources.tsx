import { useEffect, useState } from 'react';
import { Monitor, Plus, Link as LinkIcon, File, Video, BookOpen, ExternalLink, X } from 'lucide-react';
import { getStoredData, saveStoredData } from '@/lib/mockStore';

const STORAGE_KEY_RESOURCES = 'umla_resources';

const MOCK_RESOURCES = [
  { id: '1', title: 'React Documentation', type: 'LINK', url: 'https://react.dev', course: { code: 'IF301' } },
  { id: '2', title: 'Database Systems PDF', type: 'PDF', url: 'https://example.com/db.pdf', course: { code: 'IF204' } },
  { id: '3', title: 'MIT OpenCourseWare - Algorithms', type: 'VIDEO', url: 'https://ocw.mit.edu', course: null },
  { id: '4', title: 'Clean Code by Robert Martin', type: 'BOOK', url: 'https://example.com/book', course: null },
  { id: '5', title: 'TypeScript Handbook', type: 'LINK', url: 'https://typescriptlang.org', course: { code: 'IF301' } },
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'PDF': return <File className="w-6 h-6 text-red-500" />;
    case 'VIDEO': return <Video className="w-6 h-6 text-blue-500" />;
    case 'BOOK': return <BookOpen className="w-6 h-6 text-green-500" />;
    default: return <LinkIcon className="w-6 h-6 text-orange-500" />;
  }
};

export default function Resources() {
  const [resources, setResources] = useState(() => getStoredData(STORAGE_KEY_RESOURCES, MOCK_RESOURCES));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', type: 'LINK', url: '' });

  useEffect(() => { saveStoredData(STORAGE_KEY_RESOURCES, resources); }, [resources]);

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    setResources([{ id: Date.now().toString(), ...newResource, course: null }, ...resources]);
    setIsModalOpen(false);
    setNewResource({ title: '', type: 'LINK', url: '' });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><Monitor className="w-8 h-8 text-orange-600" /> RESOURCES</h1>
          <p className="page-subtitle">Links, PDFs, and study materials 🔗</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> NEW RESOURCE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, i) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card p-6 border-drawn shadow-brutal-sm flex flex-col h-full hover:-translate-y-1 hover:shadow-brutal transition-all group animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-muted rounded-full border-drawn">{getResourceIcon(resource.type)}</div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-foreground line-clamp-2 group-hover:text-blue-600 transition-colors">{resource.title}</h3>
                {resource.course && (
                  <span className="inline-block mt-1 bg-orange-100 text-orange-800 px-2 py-0.5 font-medium text-xs">{resource.course.code}</span>
                )}
              </div>
            </div>
            <div className="mt-auto pt-4 border-t-2 border-dashed border-muted flex items-center justify-between text-sm text-muted-foreground">
              <span className="truncate pr-4">{new URL(resource.url).hostname}</span>
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
            </div>
          </a>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">NEW RESOURCE</h2>
            <form onSubmit={handleCreateResource} className="space-y-4">
              <div>
                <label className="block font-bold text-sm mb-1">Title</label>
                <input type="text" required value={newResource.title} onChange={e => setNewResource({ ...newResource, title: e.target.value })} className="input-brutal" placeholder="e.g. React Documentation" />
              </div>
              <div>
                <label className="block font-bold text-sm mb-1">URL</label>
                <input type="url" required value={newResource.url} onChange={e => setNewResource({ ...newResource, url: e.target.value })} className="input-brutal" placeholder="https://..." />
              </div>
              <div>
                <label className="block font-bold text-sm mb-1">Type</label>
                <select value={newResource.type} onChange={e => setNewResource({ ...newResource, type: e.target.value })} className="input-brutal">
                  <option value="LINK">Link</option>
                  <option value="PDF">PDF</option>
                  <option value="VIDEO">Video</option>
                  <option value="BOOK">Book</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 btn-secondary">CANCEL</button>
                <button type="submit" className="flex-1 btn-primary">SAVE</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
