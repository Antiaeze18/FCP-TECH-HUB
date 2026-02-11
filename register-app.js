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

function RegisterApp() {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem('fcp-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('fcp-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    course: '',
    agreement: false
  });
  
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const courses = [
    'Web Development',
    'Python',
    'Java', 
    'Data Science'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.agreement) newErrors.agreement = 'You must agree to the user agreement';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const existingStudents = JSON.parse(localStorage.getItem('fcpStudents') || '[]');
      const emailExists = existingStudents.find(student => student.email === formData.email);
      
      if (emailExists) {
        setErrors({ email: 'Email already registered. Please use login page.' });
        setIsSubmitting(false);
        return;
      }
      
      const newStudent = {
        id: Date.now().toString(),
        ...formData,
        registeredAt: new Date().toISOString()
      };
      
      existingStudents.push(newStudent);
      localStorage.setItem('fcpStudents', JSON.stringify(existingStudents));
      
      setTimeout(() => {
        alert('Registration successful! Redirecting to login page...');
        window.location.href = 'login.html';
      }, 500);
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
      setIsSubmitting(false);
    }
  };

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)]" data-name="register-app" data-file="register-app.js">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          <div className={`icon-${isDark ? 'sun' : 'moon'} text-xl text-[var(--primary-color)]`}></div>
        </button>
        
        <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="school-logo mx-auto mb-6">
                <img src="assests/logo.jpg.jpg" alt="School Logo" className="w-full h-full object-contain rounded-2xl shadow-lg" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] bg-clip-text text-transparent">FCP TECH HUB</h1>
              <p className="text-[var(--text-secondary)] mt-2 text-lg">Student Registration</p>
            </div>

            {/* Registration Form */}
            <div className="form-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                  {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Course Selection *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select a course</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  {errors.course && <p className="error-message">{errors.course}</p>}
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <label className="text-sm text-[var(--text-primary)]">
                    I agree to the <a href="#" className="text-[var(--primary-color)] hover:underline">User Agreement</a> and 
                    <a href="#" className="text-[var(--primary-color)] hover:underline"> Privacy Policy</a> *
                  </label>
                </div>
                {errors.agreement && <p className="error-message">{errors.agreement}</p>}

                {errors.submit && <p className="error-message">{errors.submit}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-[var(--text-secondary)]">
                  Already have an account?{' '}
                  <a href="login.html" className="text-[var(--primary-color)] hover:text-[var(--accent-color)] font-medium transition-colors duration-300 hover:underline">
                    Login here
                  </a>
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <a href="index.html" className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300 font-medium">
                <div className="icon-arrow-left text-sm mr-2"></div>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('RegisterApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <RegisterApp />
  </ErrorBoundary>
);