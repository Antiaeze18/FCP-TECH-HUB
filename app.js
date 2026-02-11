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
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem('fcp-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('fcp-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)]" data-name="app" data-file="app.js">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          <div className={`icon-${isDark ? 'sun' : 'moon'} text-xl text-[var(--primary-color)]`}></div>
        </button>
        {/* Header */}
        <header className="bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-lg border-b border-[var(--border-color)] sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 animate-float">
                <div className="school-logo">
                  <img src="assests/logo.jpg.jpg" alt="School Logo" className="w-full h-full object-contain rounded-2xl shadow-lg" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-bold text-[var(--text-primary)] hero-text">FCP TECH HUB</h1>
                  <p className="text-sm text-[var(--text-secondary)]">Learn Programming</p>
                </div>
              </div>
              <nav className="flex space-x-2 sm:space-x-4">
                <a href="register.html" className="btn-primary nav-link text-sm sm:text-base px-4 sm:px-6">Register</a>
                <a href="login.html" className="btn-secondary nav-link text-sm sm:text-base px-4 sm:px-6">Login</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 hero-text animate-glow">
              Welcome to FCP TECH HUB
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed">
              Master the art of programming with our comprehensive courses. Choose from Web Development, 
              Python, Java, or Data Science and start your coding journey today.
            </p>
            
            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
              <div className="card card-hover text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--accent-color)] to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="icon-code text-xl text-white course-icon"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Web Development</h3>
                <p className="text-[var(--text-secondary)] text-sm">HTML, CSS, JavaScript, React</p>
              </div>
              
              <div className="card card-hover text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="icon-terminal text-xl text-white course-icon"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Python</h3>
                <p className="text-[var(--text-secondary)] text-sm">Django, Flask, Machine Learning</p>
              </div>
              
              <div className="card card-hover text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="icon-coffee text-xl text-white course-icon"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Java</h3>
                <p className="text-[var(--text-secondary)] text-sm">Spring Boot, Android Development</p>
              </div>
              
              <div className="card card-hover text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="icon-chart-bar text-xl text-white course-icon"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Data Science</h3>
                <p className="text-[var(--text-secondary)] text-sm">Analytics, AI, Machine Learning</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 justify-center items-center">
              <a href="register.html" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto animate-glow">Start Learning Today</a>
              <a href="#about" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">Learn More</a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-lg border-t border-[var(--border-color)] mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-[var(--text-secondary)]">
              <p>&copy; 2025 FCP TECH HUB. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);