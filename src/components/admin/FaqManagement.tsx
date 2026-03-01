import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, Loader2, GripVertical } from 'lucide-react';
import { Button } from '../Button';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '../../firebase/content';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadFAQs();
  }, []);

  async function loadFAQs() {
    try {
      const faqData = await getFAQs();
      setFaqs(faqData);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateFAQ(data: Omit<FAQ, 'id'>) {
    try {
      await createFAQ(data);
      await loadFAQs();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating FAQ:', error);
    }
  }

  async function handleUpdateFAQ(id: string, data: Omit<FAQ, 'id'>) {
    try {
      await updateFAQ(id, data);
      await loadFAQs();
      setEditingFaq(null);
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  }

  async function handleDeleteFAQ(id: string) {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await deleteFAQ(id);
      await loadFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">FAQ Management</h2>
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => {
            setEditingFaq(null);
            setIsDialogOpen(true);
          }}
        >
          <PlusCircle className="w-5 h-5" />
          Add New FAQ
        </Button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                </div>
                <p className="text-gray-600 ml-8">{faq.answer}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setEditingFaq(faq);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteFAQ(faq.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Form Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">
              {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  question: formData.get('question') as string,
                  answer: formData.get('answer') as string,
                  order: editingFaq ? editingFaq.order : faqs.length + 1
                };

                if (editingFaq) {
                  handleUpdateFAQ(editingFaq.id, data);
                } else {
                  handleCreateFAQ(data);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  defaultValue={editingFaq?.question}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Answer
                </label>
                <textarea
                  name="answer"
                  defaultValue={editingFaq?.answer}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingFaq(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editingFaq ? 'Update FAQ' : 'Add FAQ'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}