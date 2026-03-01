import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, Loader2, Calendar, User, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../Button';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../firebase/blog';
import { uploadImage, deleteImage } from '../../firebase/storage';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
}

export function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const postsData = await getBlogPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size must be less than 5MB');
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleCreatePost(data: any) {
    setSaving(true);
    const loadingToast = toast.loading('Creating blog post...');

    try {
      let imageUrl = '';
      if (selectedImage) {
        const path = `blog-images/${Date.now()}-${selectedImage.name}`;
        imageUrl = await uploadImage(selectedImage, path);
      }

      await createBlogPost({
        ...data,
        imageUrl
      });

      await loadPosts();
      setIsDialogOpen(false);
      setSelectedImage(null);
      setImagePreview('');
      toast.dismiss(loadingToast);
      toast.success('Blog post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to create blog post');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdatePost(id: string, data: any) {
    setSaving(true);
    const loadingToast = toast.loading('Updating blog post...');

    try {
      let imageUrl = editingPost?.imageUrl || '';
      
      if (selectedImage) {
        // Delete old image if it exists
        if (editingPost?.imageUrl) {
          await deleteImage(editingPost.imageUrl);
        }
        
        // Upload new image
        const path = `blog-images/${Date.now()}-${selectedImage.name}`;
        imageUrl = await uploadImage(selectedImage, path);
      }

      await updateBlogPost(id, {
        ...data,
        imageUrl
      });
      
      await loadPosts();
      setEditingPost(null);
      setIsDialogOpen(false);
      setSelectedImage(null);
      setImagePreview('');
      toast.dismiss(loadingToast);
      toast.success('Blog post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to update blog post');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePost(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    const loadingToast = toast.loading('Deleting blog post...');

    try {
      const post = posts.find(p => p.id === id);
      if (post?.imageUrl) {
        await deleteImage(post.imageUrl);
      }
      await deleteBlogPost(id);
      await loadPosts();
      toast.dismiss(loadingToast);
      toast.success('Blog post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to delete blog post');
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
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => {
            setEditingPost(null);
            setIsDialogOpen(true);
          }}
        >
          <PlusCircle className="w-5 h-5" />
          Add New Post
        </Button>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setEditingPost(post);
                    setImagePreview(post.imageUrl);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeletePost(post.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Post Form Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  title: formData.get('title') as string,
                  excerpt: formData.get('excerpt') as string,
                  content: formData.get('content') as string,
                  author: formData.get('author') as string,
                  date: formData.get('date') as string,
                  category: formData.get('category') as string
                };

                if (editingPost) {
                  handleUpdatePost(editingPost.id, data);
                } else {
                  handleCreatePost(data);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingPost?.title}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  defaultValue={editingPost?.excerpt}
                  required
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  defaultValue={editingPost?.content}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  {imagePreview && (
                    <div className="relative w-24 h-24">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview('');
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    defaultValue={editingPost?.author}
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={editingPost?.date}
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={editingPost?.category}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Technology">Technology</option>
                  <option value="AI Safety">AI Safety</option>
                  <option value="Education">Education</option>
                  <option value="Digital Citizenship">Digital Citizenship</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingPost(null);
                    setSelectedImage(null);
                    setImagePreview('');
                  }}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      {editingPost ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingPost ? 'Update Post' : 'Create Post'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}