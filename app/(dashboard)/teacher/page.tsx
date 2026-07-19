'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  BookOpen, 
  Users, 
  Clock, 
  Upload, 
  Megaphone, 
  TrendingUp,
  FileText,
  CheckCircle,
  ChevronRight,
  Play,
  MessageSquare,
  Plus
} from 'lucide-react';

interface TodayClass {
  id: string;
  courseCode: string;
  courseTitle: string;
  room: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

interface SyllabusProgress {
  courseId: string;
  courseName: string;
  totalTopics: number;
  coveredTopics: number;
  percentage: number;
}

interface ThesisReview {
  id: string;
  studentName: string;
  thesisTitle: string;
  submittedAt: string;
  status: 'pending' | 'reviewed';
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [todayClasses, setTodayClasses] = useState<TodayClass[]>([]);
  const [syllabusProgress, setSyllabusProgress] = useState<SyllabusProgress[]>([]);
  const [pendingThesis, setPendingThesis] = useState<ThesisReview[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    avgAttendance: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock data - Replace with API calls
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setTodayClasses([
        {
          id: '1',
          courseCode: 'CSE 101',
          courseTitle: 'Introduction to Programming',
          room: 'Room 301',
          startTime: '10:00',
          endTime: '11:30',
          status: 'ongoing'
        },
        {
          id: '2',
          courseCode: 'CSE 205',
          courseTitle: 'Data Structures',
          room: 'Room 205',
          startTime: '12:00',
          endTime: '13:30',
          status: 'upcoming'
        },
        {
          id: '3',
          courseCode: 'CSE 310',
          courseTitle: 'Database Management',
          room: 'Room 401',
          startTime: '14:00',
          endTime: '15:30',
          status: 'upcoming'
        }
      ]);

      setSyllabusProgress([
        {
          courseId: '1',
          courseName: 'CSE 101 - Introduction to Programming',
          totalTopics: 24,
          coveredTopics: 18,
          percentage: 75
        },
        {
          courseId: '2',
          courseName: 'CSE 205 - Data Structures',
          totalTopics: 20,
          coveredTopics: 12,
          percentage: 60
        },
        {
          courseId: '3',
          courseName: 'CSE 310 - Database Management',
          totalTopics: 16,
          coveredTopics: 10,
          percentage: 62.5
        }
      ]);

      setPendingThesis([
        {
          id: '1',
          studentName: 'Md. Rahman',
          thesisTitle: 'AI in Healthcare',
          submittedAt: '2024-01-15T10:00:00Z',
          status: 'pending'
        },
        {
          id: '2',
          studentName: 'Sadia Akter',
          thesisTitle: 'Blockchain for Supply Chain',
          submittedAt: '2024-01-14T15:30:00Z',
          status: 'pending'
        }
      ]);

      setStats({
        totalStudents: 120,
        totalCourses: 5,
        avgAttendance: 78,
        completionRate: 68
      });

      setLoading(false);
    }, 1000);
  }, []);

  const handleStartClass = (classId: string) => {
    router.push(`/teacher/attendance?class=${classId}`);
  };

  const handleUploadNote = () => {
    setShowUploadModal(true);
  };

  const handleCreateAnnouncement = () => {
    setShowAnnouncementModal(true);
  };

  const handleViewThesis = (thesisId: string) => {
    console.log('Viewing thesis:', thesisId);
  };

  // Quick Actions
  const quickActions: QuickAction[] = [
    {
      id: 'upload-note',
      title: 'Upload Note',
      icon: <Upload className="w-5 h-5" />,
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
      onClick: handleUploadNote
    },
    {
      id: 'create-announcement',
      title: 'Create Announcement',
      icon: <Megaphone className="w-5 h-5" />,
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
      onClick: handleCreateAnnouncement
    },
    {
      id: 'view-syllabus',
      title: 'View Syllabus',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-green-50 text-green-600 hover:bg-green-100',
      onClick: () => router.push('/teacher/thesis-sync')
    },
    {
      id: 'attendance',
      title: 'Attendance Report',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
      onClick: () => router.push('/teacher/attendance')
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900">
          Welcome back, Teacher! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Here&apos;s your teaching summary for today — {new Intl.DateTimeFormat('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
          }).format(new Date())}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Today&apos;s Classes</p>
              <p className="text-3xl font-bold text-navy-900 mt-1">
                {todayClasses.length}
              </p>
            </div>
            <div className="bg-navy-50 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-navy-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">
              {todayClasses.filter(c => c.status === 'ongoing').length} ongoing
            </span>
            <span className="text-gray-300 mx-2">•</span>
            <span className="text-gray-600">
              {todayClasses.filter(c => c.status === 'upcoming').length} upcoming
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">My Courses</p>
              <p className="text-3xl font-bold text-navy-900 mt-1">
                {stats.totalCourses}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${stats.completionRate}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.completionRate}% syllabus completion
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Students</p>
              <p className="text-3xl font-bold text-navy-900 mt-1">
                {stats.totalStudents}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">
              {stats.avgAttendance}% avg attendance
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending Reviews</p>
              <p className="text-3xl font-bold text-navy-900 mt-1">
                {pendingThesis.length}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-full">
              <FileText className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-red-600 font-medium">
              Thesis awaiting review
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-navy-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-navy-600" />
                Today&apos;s Schedule
              </h2>
              <button onClick={() => router.push('/teacher/attendance')} className="text-sm text-navy-600 hover:text-navy-800 font-medium">
                View Full Schedule →
              </button>
            </div>

            <div className="space-y-4">
              {todayClasses.length > 0 ? (
                todayClasses.map((cls) => (
                  <div 
                    key={cls.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      cls.status === 'ongoing' 
                        ? 'border-green-400 bg-green-50' 
                        : cls.status === 'upcoming'
                        ? 'border-blue-200 hover:border-blue-300 bg-white'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            cls.status === 'ongoing' 
                              ? 'bg-green-500 text-white' 
                              : cls.status === 'upcoming'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-500 text-white'
                          }`}>
                            {cls.status === 'ongoing' ? 'LIVE' : cls.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                          </div>
                          <h3 className="font-bold text-navy-900">
                            {cls.courseCode}
                          </h3>
                          <span className="text-sm text-gray-600">
                            {cls.courseTitle}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600 sm:gap-4">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {cls.startTime} - {cls.endTime}
                          </span>
                          <span className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {cls.room}
                          </span>
                        </div>
                      </div>
                      
                      {cls.status !== 'completed' && (
                        <button
                          onClick={() => handleStartClass(cls.id)}
                          className={`flex w-full items-center justify-center space-x-2 rounded-lg px-6 py-3 font-medium transition-all hover:scale-[1.02] sm:w-auto ${
                            cls.status === 'ongoing'
                              ? 'bg-green-600 hover:bg-green-700 text-white animate-pulse'
                              : 'bg-navy-600 hover:bg-navy-700 text-white'
                          }`}
                        >
                          <Play className="w-4 h-4" />
                          <span>{cls.status === 'ongoing' ? 'Resume Class' : 'Start Class'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="font-medium">No classes scheduled for today</p>
                  <p className="text-sm">Enjoy your day! 🎉</p>
                </div>
              )}
            </div>
          </div>

          {/* Syllabus Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-navy-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-navy-600" />
                Weekly Syllabus Progress
              </h2>
              <span className="text-sm text-gray-500">
                Average: {Math.round(syllabusProgress.reduce((acc, curr) => acc + curr.percentage, 0) / syllabusProgress.length)}%
              </span>
            </div>

            <div className="space-y-4">
              {syllabusProgress.map((course) => (
                <div key={course.courseId}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-navy-900">{course.courseName}</span>
                    <span className="text-gray-600">{course.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        course.percentage >= 80 ? 'bg-green-600' :
                        course.percentage >= 60 ? 'bg-blue-600' :
                        course.percentage >= 40 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${course.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{course.coveredTopics} topics covered</span>
                    <span>{course.totalTopics - course.coveredTopics} remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-navy-900 flex items-center mb-4">
              <Plus className="w-5 h-5 mr-2 text-navy-600" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className={`p-4 rounded-lg ${action.color} transition-all hover:scale-105 text-center`}
                >
                  <div className="flex flex-col items-center">
                    {action.icon}
                    <span className="text-xs font-medium mt-1">{action.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pending Thesis Reviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-navy-900 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-navy-600" />
                Pending Thesis Reviews
              </h2>
              <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                {pendingThesis.length} pending
              </span>
            </div>

            {pendingThesis.length > 0 ? (
              <div className="space-y-3">
                {pendingThesis.map((thesis) => (
                  <div 
                    key={thesis.id}
                    className="p-3 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-300 cursor-pointer transition-all"
                    onClick={() => handleViewThesis(thesis.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-navy-900 text-sm">
                          {thesis.studentName}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {thesis.thesisTitle}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Submitted: {new Intl.DateTimeFormat('en-US', {
                            month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                          }).format(new Date(thesis.submittedAt))}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          Pending
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto text-green-300 mb-3" />
                <p className="font-medium">All caught up! 🎉</p>
                <p className="text-sm">No pending thesis reviews</p>
              </div>
            )}

            {pendingThesis.length > 0 && (
              <button 
                className="w-full mt-4 text-sm text-navy-600 hover:text-navy-800 font-medium"
                onClick={() => router.push('/teacher/thesis-sync')}
              >
                View All Reviews →
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl p-6 text-white">
            <h3 className="text-sm font-medium text-navy-200 mb-3">Weekly Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-navy-200">Classes Conducted</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-navy-200">Attendance Rate</span>
                <span className="font-bold">{stats.avgAttendance}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-navy-200">Resources Shared</span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-navy-200">Syllabus Progress</span>
                <span className="font-bold">{stats.completionRate}%</span>
              </div>
              <div className="border-t border-navy-700 pt-3 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-navy-200">Overall Performance</span>
                  <span className="font-bold text-green-400">Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Note Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6">
            <h3 className="text-xl font-bold text-navy-900 mb-4">Upload Note</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500">
                  <option>Select Course</option>
                  <option>CSE 101 - Introduction to Programming</option>
                  <option>CSE 205 - Data Structures</option>
                  <option>CSE 310 - Database Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500"
                  placeholder="Enter note title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File
                </label>
                <input 
                  type="file" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  className="flex-1 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700"
                  onClick={() => setShowUploadModal(false)}
                >
                  Upload
                </button>
                <button 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6">
            <h3 className="text-xl font-bold text-navy-900 mb-4">Create Announcement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500">
                  <option>All Courses</option>
                  <option>CSE 101 - Introduction to Programming</option>
                  <option>CSE 205 - Data Structures</option>
                  <option>CSE 310 - Database Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500"
                  placeholder="Announcement title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea 
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500"
                  placeholder="Write your announcement..."
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  onClick={() => setShowAnnouncementModal(false)}
                >
                  Send
                </button>
                <button 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setShowAnnouncementModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
