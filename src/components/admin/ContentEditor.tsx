import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';
import { updatePageContent } from '../../firebase/content';
import type { PageContent } from '../../types/content';
import { Button } from '../Button';

interface ContentEditorProps {
  content: PageContent | null;
  onSave: () => void;
}

export function ContentEditor({ content, onSave }: ContentEditorProps) {
  const [editedContent, setEditedContent] = useState<PageContent>(
    content || {
      id: '',
      slug: '',
      title: '',
      description: '',
      sections: [],
      lastUpdated: new Date().toISOString()
    }
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editedContent.id) {
      console.warn('Cannot save content without an ID');
      return;
    }

    setSaving(true);
    try {
      await updatePageContent(editedContent.id, editedContent);
      onSave();
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold">Edit Page Content</h3>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={handleSave}
          disabled={saving || !editedContent.id}
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Title
          </label>
          <input
            type="text"
            value={editedContent.title}
            onChange={(e) => setEditedContent({
              ...editedContent,
              title: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter page title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={editedContent.description}
            onChange={(e) => setEditedContent({
              ...editedContent,
              description: e.target.value
            })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter page description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Sections
          </label>
          {editedContent.sections.map((section, index) => (
            <div key={section.id} className="bg-gray-50 p-4 rounded-lg mb-4">
              <input
                type="text"
                value={section.title}
                onChange={(e) => {
                  const newSections = [...editedContent.sections];
                  newSections[index] = {
                    ...section,
                    title: e.target.value
                  };
                  setEditedContent({
                    ...editedContent,
                    sections: newSections
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Section Title"
              />
              <textarea
                value={section.content}
                onChange={(e) => {
                  const newSections = [...editedContent.sections];
                  newSections[index] = {
                    ...section,
                    content: e.target.value
                  };
                  setEditedContent({
                    ...editedContent,
                    sections: newSections
                  });
                }}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Section Content"
              />
            </div>
          ))}
          <Button
            variant="outlined"
            onClick={() => {
              setEditedContent({
                ...editedContent,
                sections: [
                  ...editedContent.sections,
                  {
                    id: `section-${Date.now()}`,
                    title: '',
                    content: '',
                    order: editedContent.sections.length,
                    lastUpdated: new Date().toISOString()
                  }
                ]
              });
            }}
            className="mt-2"
          >
            Add Section
          </Button>
        </div>
      </div>
    </div>
  );
}