import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Pencil, 
  Trash2, 
  Loader2, 
  CheckCircle, 
  XCircle,
  Clock,
  Users,
  BookOpen,
  Plus,
  Minus,
  MapPin
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../Dialog';
import { Button } from '../Button';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../firebase/courses';
import type { Course, CurriculumItem, Session } from '../../types/course';

const countries = [
  { value: 'AT', label: 'Austria' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'EE', label: 'Estonia' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'DE', label: 'Germany' },
  { value: 'GR', label: 'Greece' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IT', label: 'Italy' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MT', label: 'Malta' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'RO', label: 'Romania' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'ES', label: 'Spain' },
  { value: 'SE', label: 'Sweden' }
];

const defaultCourse: Omit<Course, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  price: 140,
  subsidizedPrice: {
    min: 60,
    max: 90
  },
  duration: '8 weeks',
  enrollments: 0,
  rating: 5,
  category: 'technology',
  level: 'beginner',
  language: 'English',
  instructor: '',
  status: 'draft',
  featured: false,
  outcomes: [''],
  curriculum: [
    { week: 1, topic: '', hours: 3 }
  ],
  nextSessions: [
    {
      id: `session-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: '15:00',
      seatsTotal: 20,
      seatsBooked: 0,
      location: {
        country: '',
        city: '',
        address: '',
        postalCode: ''
      }
    }
  ]
};

const LocationFields = ({ session, index, updateSession }: { 
  session: Session; 
  index: number;
  updateSession: (index: number, field: string, value: string) => void;
}) => (
  <div className="grid grid-cols-2 gap-4 mt-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Country
      </label>
      <select
        value={session.location?.country || ''}
        onChange={(e) => updateSession(index, 'country', e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select country...</option>
        {countries.map(country => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        City
      </label>
      <input
        type="text"
        value={session.location?.city || ''}
        onChange={(e) => updateSession(index, 'city', e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter city..."
      />
    </div>
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Address
      </label>
      <input
        type="text"
        value={session.location?.address || ''}
        onChange={(e) => updateSession(index, 'address', e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter street address..."
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Postal Code
      </label>
      <input
        type="text"
        value={session.location?.postalCode || ''}
        onChange={(e) => updateSession(index, 'postalCode', e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter postal code..."
      />
    </div>
  </div>
);

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<typeof defaultCourse>(defaultCourse);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const coursesData = await getCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCourse() {
    setActionLoading(true);
    try {
      await createCourse(newCourse);
      await loadCourses();
      setIsDialogOpen(false);
      setNewCourse(defaultCourse);
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleUpdateCourse() {
    if (!editingCourse) return;
    setActionLoading(true);
    try {
      await updateCourse(editingCourse.id, editingCourse);
      await loadCourses();
      setIsDialogOpen(false);
      setEditingCourse(null);
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDeleteCourse(id: string) {
    if (!confirm('Are you sure you want to delete this course?')) return;
    setActionLoading(true);
    try {
      await deleteCourse(id);
      await loadCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    } finally {
      setActionLoading(false);
    }
  }

  function handleAddOutcome(course: Course | typeof defaultCourse) {
    if ('id' in course) {
      setEditingCourse({
        ...course,
        outcomes: [...course.outcomes, '']
      });
    } else {
      setNewCourse({
        ...course,
        outcomes: [...course.outcomes, '']
      });
    }
  }

  function handleAddCurriculumItem(course: Course | typeof defaultCourse) {
    const newItem: CurriculumItem = {
      week: course.curriculum.length + 1,
      topic: '',
      hours: 3
    };

    if ('id' in course) {
      setEditingCourse({
        ...course,
        curriculum: [...course.curriculum, newItem]
      });
    } else {
      setNewCourse({
        ...course,
        curriculum: [...course.curriculum, newItem]
      });
    }
  }

  function handleAddSession(course: Course | typeof defaultCourse) {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: '15:00',
      seatsTotal: 20,
      seatsBooked: 0,
      location: {
        country: '',
        city: '',
        address: '',
        postalCode: ''
      }
    };

    if ('id' in course) {
      setEditingCourse({
        ...course,
        nextSessions: [...course.nextSessions, newSession]
      });
    } else {
      setNewCourse({
        ...course,
        nextSessions: [...course.nextSessions, newSession]
      });
    }
  }

  const CourseForm = ({ course, setCourse }: { 
    course: Course | typeof defaultCourse;
    setCourse: (course: any) => void;
  }) => {
    const updateSession = (index: number, field: string, value: string) => {
      const newSessions = [...course.nextSessions];
      if (!newSessions[index].location) {
        newSessions[index].location = {
          country: '',
          city: '',
          address: '',
          postalCode: ''
        };
      }
      newSessions[index].location = {
        ...newSessions[index].location,
        [field]: value
      };
      setCourse({ ...course, nextSessions: newSessions });
    };

    return (
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={course.title}
                onChange={(e) => setCourse({ ...course, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., Digital Safety Fundamentals"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Provide a detailed description of the course..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={course.category}
                  onChange={(e) => setCourse({ ...course, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="safety">Safety</option>
                  <option value="technology">Technology</option>
                  <option value="engineering">Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  value={course.level}
                  onChange={(e) => setCourse({ ...course, level: e.target.value as Course['level'] })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={course.language}
                  onChange={(e) => setCourse({ ...course, language: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="English">English</option>
                  <option value="German">German</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                <input
                  type="text"
                  value={course.instructor}
                  onChange={(e) => setCourse({ ...course, instructor: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Instructor name"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Pricing</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (€)</label>
              <input
                type="number"
                value={course.price}
                onChange={(e) => setCourse({ ...course, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                min="0"
                step="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subsidized Price Range (€)</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={course.subsidizedPrice.min}
                  onChange={(e) => setCourse({
                    ...course,
                    subsidizedPrice: { ...course.subsidizedPrice, min: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Min"
                  min="0"
                  step="10"
                />
                <input
                  type="number"
                  value={course.subsidizedPrice.max}
                  onChange={(e) => setCourse({
                    ...course,
                    subsidizedPrice: { ...course.subsidizedPrice, max: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Max"
                  min="0"
                  step="10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Structure */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Course Structure</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={course.duration}
                onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., 8 weeks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Learning Outcomes</label>
              {course.outcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => {
                      const newOutcomes = [...course.outcomes];
                      newOutcomes[index] = e.target.value;
                      setCourse({ ...course, outcomes: newOutcomes });
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="What students will learn..."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newOutcomes = course.outcomes.filter((_, i) => i !== index);
                      setCourse({ ...course, outcomes: newOutcomes });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => handleAddOutcome(course)}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Outcome
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Curriculum</label>
              {course.curriculum.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                  <input
                    type="number"
                    value={item.week}
                    onChange={(e) => {
                      const newCurriculum = [...course.curriculum];
                      newCurriculum[index] = { ...item, week: Number(e.target.value) };
                      setCourse({ ...course, curriculum: newCurriculum });
                    }}
                    className="col-span-2 px-3 py-2 border rounded-lg"
                    placeholder="Week"
                    min="1"
                  />
                  <input
                    type="text"
                    value={item.topic}
                    onChange={(e) => {
                      const newCurriculum = [...course.curriculum];
                      newCurriculum[index] = { ...item, topic: e.target.value };
                      setCourse({ ...course, curriculum: newCurriculum });
                    }}
                    className="col-span-8 px-3 py-2 border rounded-lg"
                    placeholder="Topic"
                  />
                  <input
                    type="number"
                    value={item.hours}
                    onChange={(e) => {
                      const newCurriculum = [...course.curriculum];
                      newCurriculum[index] = { ...item, hours: Number(e.target.value) };
                      setCourse({ ...course, curriculum: newCurriculum });
                    }}
                    className="col-span-1 px-3 py-2 border rounded-lg"
                    placeholder="Hours"
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newCurriculum = course.curriculum.filter((_, i) => i !== index);
                      setCourse({ ...course, curriculum: newCurriculum });
                    }}
                    className="col-span-1 text-red-500 hover:text-red-700"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => handleAddCurriculumItem(course)}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Week
              </Button>
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Available Sessions</h3>
          {course.nextSessions.map((session, index) => (
            <div key={session.id} className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <div className="grid grid-cols-12 gap-4">
                <input
                  type="date"
                  value={session.date}
                  onChange={(e) => {
                    const newSessions = [...course.nextSessions];
                    newSessions[index] = { ...session, date: e.target.value };
                    setCourse({ ...course, nextSessions: newSessions });
                  }}
                  className="col-span-4 px-3 py-2 border rounded-lg"
                />
                <input
                  type="time"
                  value={session.time}
                  onChange={(e) => {
                    const newSessions = [...course.nextSessions];
                    newSessions[index] = { ...session, time: e.target.value };
                    setCourse({ ...course, nextSessions: newSessions });
                  }}
                  className="col-span-3 px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  value={session.seatsTotal}
                  onChange={(e) => {
                    const newSessions = [...course.nextSessions];
                    newSessions[index] = { ...session, seatsTotal: Number(e.target.value) };
                    setCourse({ ...course, nextSessions: newSessions });
                  }}
                  className="col-span-4 px-3 py-2 border rounded-lg"
                  placeholder="Total Seats"
                  min="1"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newSessions = course.nextSessions.filter((_, i) => i !== index);
                    setCourse({ ...course, nextSessions: newSessions });
                  }}
                  className="col-span-1 text-red-500 hover:text-red-700"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>

              <LocationFields 
                session={session} 
                index={index}
                updateSession={updateSession}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => handleAddSession(course)}
            className="mt-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Session
          </Button>
        </div>

        {/* Status */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Course Status</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={course.status}
                onChange={(e) => setCourse({ ...course, status: e.target.value as Course['status'] })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={course.featured}
                onChange={(e) => setCourse({ ...course, featured: e.target.checked })}
                className="w-4 h-4 text-blue-600"
              />
              <label className="text-sm font-medium text-gray-700">
                Feature this course on the homepage
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="primary" className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Fill in the course details below
              </DialogDescription>
            </DialogHeader>
            <CourseForm course={newCourse} setCourse={setNewCourse} />
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={actionLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCreateCourse}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  'Create Course'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'active' ? 'bg-green-100 text-green-800' :
                    course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                  {course.featured && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.enrollments} enrolled
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.curriculum.length} weeks
                  </div>
                  {course.nextSessions[0]?.location?.city && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {course.nextSessions[0].location.city}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => setEditingCourse(course)}
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Course</DialogTitle>
                      <DialogDescription>
                        Update the course details below
                      </DialogDescription>
                    </DialogHeader>
                    {editingCourse && (
                      <>
                        <CourseForm
                          course={editingCourse}
                          setCourse={setEditingCourse}
                        />
                        <div className="flex justify-end gap-2 mt-6">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingCourse(null);
                              setIsDialogOpen(false);
                            }}
                            disabled={actionLoading}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleUpdateCourse}
                            disabled={actionLoading}
                          >
                            {actionLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Updating...
                              </>
                            ) : (
                              'Update Course'
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteCourse(course.id)}
                  disabled={actionLoading}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}