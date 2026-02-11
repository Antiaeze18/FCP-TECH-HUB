class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function DashboardApp() {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem('fcp-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('fcp-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const [student, setStudent] = React.useState(null);

  React.useEffect(() => {
    const currentStudent = localStorage.getItem('fcpCurrentStudent');
    if (!currentStudent) {
      window.location.href = 'login.html';
      return;
    }
    
    try {
      const studentData = JSON.parse(currentStudent);
      setStudent(studentData);
    } catch (error) {
      console.error('Error parsing student data:', error);
      window.location.href = 'login.html';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fcpCurrentStudent');
    window.location.href = 'index.html';
  };

  const getCourseIcon = (course) => {
    const icons = {
      'Web Development': 'code',
      'Python': 'terminal', 
      'Java': 'coffee',
      'Data Science': 'chart-bar'
    };
    return icons[course] || 'book';
  };

  const getCourseColor = (course) => {
    const colors = {
      'Web Development': 'bg-green-100 text-green-600',
      'Python': 'bg-yellow-100 text-yellow-600',
      'Java': 'bg-orange-100 text-orange-600',
      'Data Science': 'bg-purple-100 text-purple-600'
    };
    return colors[course] || 'bg-blue-100 text-blue-600';
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)]" data-name="dashboard-app" data-file="dashboard-app.js">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          <div className={`icon-${isDark ? 'sun' : 'moon'} text-xl text-[var(--primary-color)]`}></div>
        </button>
        
        {/* Header */}
        <header className="bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-lg border-b border-[var(--border-color)] sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
              <div className="school-logo">
                <img src="assests/logo.jpg.jpg" alt="School Logo" className="w-full h-full object-contain rounded-2xl shadow-lg" />
              </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] bg-clip-text text-transparent">FCP TECH HUB</h1>
                  <p className="text-sm text-[var(--text-secondary)]">Student Dashboard</p>
                </div>
              </div>
              <button onClick={handleLogout} className="btn-secondary flex items-center">
                <div className="icon-log-out text-sm mr-2"></div>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Welcome, {student.fullName}!
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              Ready to continue your programming journey?
            </p>
          </div>

          {/* Course Info Card */}
          <div className="max-w-2xl mx-auto">
            <div className="card text-center">
              <div className={`w-16 h-16 ${getCourseColor(student.course)} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <div className={`icon-${getCourseIcon(student.course)} text-2xl`}></div>
              </div>
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                Your Course: {student.course}
              </h3>
              <p className="text-[var(--text-secondary)] mb-6">
                You enrolled in this course on {new Date(student.registeredAt).toLocaleDateString()}
              </p>
              
              {/* Student Info */}
              <div className="info-grid grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Email</p>
                  <p className="text-[var(--text-primary)] font-medium">{student.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Phone</p>
                  <p className="text-[var(--text-primary)] font-medium">{student.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Date of Birth</p>
                  <p className="text-[var(--text-primary)] font-medium">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Student ID</p>
                  <p className="text-[var(--text-primary)] font-medium">FCP-{student.id}</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <button className="btn-primary w-full text-lg py-4 flex items-center justify-center">
                  <div className="icon-play text-lg mr-2"></div>
                  Start Learning
                </button>
                <a href="index.html" className="btn-secondary w-full text-lg py-4 flex items-center justify-center">
                  <div className="icon-home text-lg mr-2"></div>
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('DashboardApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <DashboardApp />
  </ErrorBoundary>
);