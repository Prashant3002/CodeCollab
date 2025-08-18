import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function LandingPage() {
  // For navigation between pages
  const navigate = useNavigate();
  
  // State for button interactions
  const [activeSection, setActiveSection] = useState('home');
  const [hoverStates, setHoverStates] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Handle navigation click
  const handleNavClick = (section) => {
    setActiveSection(section);
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle button hover
  const handleButtonHover = (buttonId, isHovering) => {
    setHoverStates(prev => ({
      ...prev,
      [buttonId]: isHovering
    }));
  };

  // Handle button click with feedback
  const handleButtonClick = (buttonId) => {
    // Visual feedback for button click
    setHoverStates(prev => ({
      ...prev,
      [buttonId]: 'clicked'
    }));
    
    // Reset after animation
    setTimeout(() => {
      setHoverStates(prev => ({
        ...prev,
        [buttonId]: false
      }));
    }, 300);
    
    // Special handling for scroll-to-top button
    if (buttonId === 'scroll-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // You can add specific actions for each button here
    console.log(`Button ${buttonId} clicked`);
  };
  
  // Show/hide scroll-to-top button based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
  <>
      {/* Custom CSS for the layout and components */}
      <style>
        {`
          /* IMPORTANT: For this component to display correctly, you must ensure Bootstrap 5.2.3 CSS and Font Awesome CSS are loaded in your main HTML file (e.g., index.html) where this React component is rendered. */
          .navbar-brand {
              font-size: 1.5rem;
              letter-spacing: 0.5px;
              color: #000 !important;
          }

          .brand-highlight {
              color: #00c2ff; /* Electric blue for brand emphasis */
          }

          /* Links Styling */
          .navbar-nav .nav-link {
              color: #000 !important;
              font-weight: 500;
              padding: 8px 15px;
              position: relative;
              transition: color 0.3s ease;
          }

          .navbar-nav .nav-link:hover {
              color: #00c2ff !important;
          }

          /* Active Link Underline Animation */
          .navbar-nav .nav-link.active::after,
          .navbar-nav .nav-link:hover::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 15%;
              width: 70%;
              height: 2px;
              background-color: #00c2ff;
              transition: width 0.3s ease;
          }

          .navbar-nav .nav-link::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 15%;
              width: 0%;
              height: 2px;
              background-color: #00c2ff;
              transition: width 0.3s ease;
          }

          /* Call-to-Action Button */
          .btn-primary {
              background-color: #00c2ff;
              border: none;
              position: relative;
              overflow: hidden;
              transition: all 0.3s ease;
          }

          .btn-primary:hover {
              background-color: #0099cc;
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .btn-primary:active, .btn-clicked {
              transform: translateY(1px);
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .btn-primary::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 5px;
              height: 5px;
              background: rgba(255, 255, 255, 0.5);
              opacity: 0;
              border-radius: 100%;
              transform: scale(1, 1) translate(-50%);
              transform-origin: 50% 50%;
          }
          
          .btn-primary:focus:not(:active)::after {
              animation: ripple 1s ease-out;
          }
          
          @keyframes ripple {
              0% {
                  transform: scale(0, 0);
                  opacity: 0.5;
              }
              100% {
                  transform: scale(20, 20);
                  opacity: 0;
              }
          }
          
          .btn-outline-primary {
              border-color: #00c2ff;
              color: #00c2ff;
              transition: all 0.3s ease;
          }
          
          .btn-outline-primary:hover {
              background-color: rgba(0, 194, 255, 0.1);
              border-color: #00c2ff;
              color: #00c2ff;
              transform: translateY(-2px);
          }
          
          .btn-outline-primary:active {
              transform: translateY(1px);
          }
          
          .btn-outline-secondary {
              transition: all 0.3s ease;
          }
          
          .btn-outline-secondary:hover {
              transform: translateY(-2px);
          }
          
          .btn-outline-secondary:active {
              transform: translateY(1px);
          }

          /* Shadow Effect */
          .navbar {
              box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          }

          .hero-section {
              background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
              padding: 80px 0;
          }

          .dashboard-mockup {
              background-color: #fff; /* White background */
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
              padding: 16px;
              display: inline-block;
          }

          .dashboard-mockup-header {
              display: flex;
              align-items: center;
              gap: 6px;
              margin-bottom: 12px;
          }

          .dashboard-mockup-header .dot {
              width: 12px;
              height: 12px;
              border-radius: 50%;
          }

          .dashboard-mockup img {
              width: 100%;
              height: auto;
              border-radius: 8px;
              display: block;
          }

          .feature-card {
              background: #ffffff;
              border: 1px solid #e9ecef;
              border-radius: 12px;
              padding: 30px;
              height: 100%;
              transition: all 0.3s ease;
          }
          .feature-card:hover {
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              transform: translateY(-5px);
          }
          .feature-icon {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden; /* Ensures the image stays inside the circle */
          }

            .feature-icon img.feature-img {
              width: 50%;
              height: auto;
              object-fit: contain;
          }

          .step-card {
              background: #ffffff;
              border: 1px solid #e9ecef;
              border-radius: 12px;
              padding: 30px;
              margin-bottom: 30px;
              position: relative;
          }
          .step-number {
              position: absolute;
              top: -15px;
              right: 30px;
              background: #007bff;
              color: white;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
          }

          .company-item {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 10px;
          }

          .company-logo {
              width: 24px;
              height: 24px;
              object-fit: contain;
            }
          .testimonial-card {
              background: #ffffff;
              border: 1px solid #e9ecef;
              border-radius: 12px;
              padding: 25px;
              height: 100%;
          }
          .pricing-card {
              background: #ffffff;
              border: 1px solid #e9ecef;
              border-radius: 12px;
              padding: 40px 30px;
              height: 100%;
              position: relative;
          }
          .pricing-card.featured {
              border: 2px solid #007bff;
              transform: scale(1.05);
          }
          .pricing-card.featured::before {
              content: "Most Popular";
              position: absolute;
              top: -15px;
              left: 50%;
              transform: translateX(-50%);
              background: #007bff;
              color: white;
              padding: 5px 20px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
          }
          .dashboard-mockup {
              background: #1a1a2e;
              border-radius: 12px;
              padding: 20px;
              color: #ffffff;
              min-height: 300px; /* Ensure it has some height */
          }
          .btn-primary {
              background: #007bff;
              border: none;
              border-radius: 8px;
              padding: 12px 30px;
              font-weight: 600;
          }
          .section-padding {
              padding: 80px 0;
          }
          .text-muted-custom {
              color: #6c757d !important;
          }
          /* Specific color for the purple icon, as Bootstrap doesn't have a direct 'bg-purple' */
          .bg-purple-opacity-10 {
              background-color: rgba(111, 66, 193, 0.1); /* Bootstrap's purple with opacity */
          }
          .text-purple {
              color: #6f42c1 !important; /* Bootstrap's purple */
          }
          
          .custom-footer {
              background-color: #0d0d0d; /* Deep dark for contrast */
              color: #bbb;
              padding: 60px 0 0px;
              font-size: 0.95rem;
          }

          .custom-footer h5 {
              color: #fff;
              margin-bottom: 15px;
          }

          .custom-footer a {
              color: #bbb;
              text-decoration: none;
              transition: color 0.3s ease;
          }

          .custom-footer a:hover {
              color: #fff;
          }

          .footer-divider {
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              margin: 40px 0;
          }

          .footer-bottom {
              font-size: 0.85rem;
          }

          .footer-social {
              display: flex;
              justify-content: center;
              gap: 15px;
          }

          .footer-social a {
              color: #bbb;
              font-size: 1.2rem;
              transition: color 0.3s ease, transform 0.3s ease;
          }

          .footer-social a:hover {
              color: #fff;
              transform: translateY(-2px);
          }
          
          /* Scroll to top button */
          .scroll-to-top {
              position: fixed;
              bottom: 20px;
              right: 20px;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #00c2ff;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
              z-index: 1000;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          
          .scroll-to-top.visible {
              opacity: 1;
              visibility: visible;
          }
          
          .scroll-to-top:hover {
              transform: translateY(-3px);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          }
          
          .scroll-to-top:active {
              transform: translateY(1px);
          }

            /* Responsive tweaks */
        @media (max-width: 768px) {
          .custom-footer {
          text-align: center;
          }
        }

        `}
      </style>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand fw-bold" href="#">
            <span className="brand-highlight">Code</span>Collab
          </a>

          {/* Mobile Toggle */}
          <button 
            className={`navbar-toggler ${hoverStates['nav-toggle'] === 'clicked' ? 'active' : ''}`} 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            onMouseEnter={() => handleButtonHover('nav-toggle', true)}
            onMouseLeave={() => handleButtonHover('nav-toggle', false)}
            onClick={() => handleButtonClick('nav-toggle')}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} 
                  aria-current="page" 
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('home');
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'features' ? 'active' : ''}`} 
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('features');
                  }}
                >
                  Features
                </a>
              </li>
              
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                >
                  Contact
                </a>
              </li>

              {/* Login Button */}
              <li className="nav-item ms-2">
                <a 
                  href="#" 
                  className={`btn btn-outline-primary px-3 rounded-pill ${hoverStates['nav-login'] === 'clicked' ? 'btn-clicked' : ''}`}
                  onMouseEnter={() => handleButtonHover('nav-login', true)}
                  onMouseLeave={() => handleButtonHover('nav-login', false)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick('nav-login');
                    navigate('/login');
                  }}
                >
                  Login
                </a>
              </li>
              
              {/* Sign Up Button */}
              <li className="nav-item ms-2">
                <a 
                  href="#" 
                  className={`btn btn-primary px-3 rounded-pill ${hoverStates['nav-signup'] === 'clicked' ? 'btn-clicked' : ''}`}
                  onMouseEnter={() => handleButtonHover('nav-signup', true)}
                  onMouseLeave={() => handleButtonHover('nav-signup', false)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick('nav-signup');
                    navigate('/signup');
                  }}
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
              Collaborate Smarter: <span className="text-primary">AI-Powered Project Management for Modern Teams</span>
              </h1>
              <p className="lead text-muted-custom mb-4">
              Brainstorm ideas, manage projects, and chat in real-time — powered by AI.
              </p>
              <div className="d-flex gap-3 mb-4">
                <button 
                  className={`btn btn-primary btn-lg ${hoverStates['hero-cta'] === 'clicked' ? 'btn-clicked' : ''}`}
                  onMouseEnter={() => handleButtonHover('hero-cta', true)}
                  onMouseLeave={() => handleButtonHover('hero-cta', false)}
                  onClick={() => {
                    handleButtonClick('hero-cta');
                    navigate('/signup');
                  }}
                >
                  Start Brainstorming
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="dashboard-mockup">
                <div className="dashboard-mockup-header">
                  <div className="dot" style={{ backgroundColor: "#ff5f56" }}></div>
                  <div className="dot" style={{ backgroundColor: "#ffbd2e" }}></div>
                  <div className="dot" style={{ backgroundColor: "#27c93f" }}></div>
                </div>
                <img 
                  src="/kanban dashboard.png" 
                  alt="Dashboard Preview" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Powerful Features for Modern Teams</h2>
            <p className="text-muted-custom">Everything you need to streamline your workflow and boost productivity</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center">
                <div className="feature-icon bg-primary bg-opacity-10 text-primary mx-auto">
                  <img src="/rocket.png" 
                    alt="Lightning Fast" 
                    className="feature-img"
                  />
                </div>
                <h5 className="fw-bold mb-3">Lightning Fast</h5>
                <p className="text-muted-custom">
                  Experience blazing-fast performance with our optimized infrastructure and cutting-edge technology.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center">
                <div className="feature-icon bg-success bg-opacity-10 text-success mx-auto">
                  <img src="/user.png" 
                    alt="Team Collaboration" 
                    className="feature-img"
                  />
                </div>
                <h5 className="fw-bold mb-3">Team Collaboration</h5>
                <p className="text-muted-custom">
                  Work together seamlessly with real-time collaboration tools and shared workspaces.
                </p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center">
                <div className="feature-icon bg-info bg-opacity-10 text-info mx-auto">
                  <img src="/growth.png" 
                    alt="Advanced Analytics" 
                    className="feature-img"
                  />
                </div>
                <h5 className="fw-bold mb-3">Advanced Analytics</h5>
                <p className="text-muted-custom">
                  Get insights into your team's performance with detailed analytics and reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">How It Works</h2>
            <p className="text-muted-custom">Get started in just a few simple steps</p>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="step-card">
                <div className="step-number">01</div>
                <div className="d-flex align-items-start">
                  <div className="feature-icon bg-primary bg-opacity-10 text-primary me-3">
                    <img src="/login-plus.png" 
                    alt="create-account" 
                    className="feature-img"
                  />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2">Create Your Account</h5>
                    <p className="text-muted-custom mb-0">
                      Sign up for free and set up your team workspace in minutes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">02</div>
                <div className="d-flex align-items-start">
                  <div className="feature-icon bg-success bg-opacity-10 text-success me-3">
                    <img src="/Upload.png" 
                    alt="Import Your Data" 
                    className="feature-img"
                  />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2">Import Your Data</h5>
                    <p className="text-muted-custom mb-0">
                      Easily import your existing projects and data with our migration tools.
                    </p>
                  </div>
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">03</div>
                <div className="d-flex align-items-start">
                  <div className="feature-icon bg-warning bg-opacity-10 text-warning me-3">
                    <img src="/user-cog.png" 
                    alt="Invite Your Team" 
                    className="feature-img"
                  />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2">Invite Your Team</h5>
                    <p className="text-muted-custom mb-0">
                      Add team members and set up permissions for seamless collaboration.
                    </p>
                  </div>
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">04</div>
                <div className="d-flex align-items-start">
                  <div className="feature-icon bg-info bg-opacity-10 text-info me-3">
                    <img src="/create.png" 
                    alt="Start Creating" 
                    className="feature-img"
                  />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2">Start Creating</h5>
                    <p className="text-muted-custom mb-0">
                      Begin working on your projects with all the tools you need at your fingertips.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Inspired by the Best, Built for the Future</h2>
            <p className="text-muted-custom">Join thousands of teams who trust our platform</p>
          </div>
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
                <div className="company-item">
                  <img src="/microsoft.png" alt="Microsoft" className="company-logo" />
                  <span className="text-muted-custom fw-bold">Microsoft</span>
                </div>
                <div className="company-item">
                  <img src="/google.png" alt="Google" className="company-logo" />
                  <span className="text-muted-custom fw-bold">Google</span>
                </div>
                <div className="company-item">
                  <img src="/apple.png" alt="Apple" className="company-logo" />
                  <span className="text-muted-custom fw-bold">Apple</span>
                </div>
                <div className="company-item">
                  <img src="/amazon.png" alt="Amazon" className="company-logo" />
                  <span className="text-muted-custom fw-bold">Amazon</span>
                </div>
                <div className="company-item">
                  <img src="/netflix.png" alt="Netflix" className="company-logo" />
                  <span className="text-muted-custom fw-bold">Netflix</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Trusted by Innovation Leaders</h2>
          </div>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="testimonial-card">
                <div className="mb-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
                <p className="text-muted-custom mb-3">
                  "This platform has revolutionized how our team collaborates. The intuitive interface and powerful
                  features have increased our productivity by 40%."
                </p>
                <div className="d-flex align-items-center">
                  <div 
                    className="bg-primary rounded-circle me-3 d-flex justify-content-center align-items-center text-white"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Sarah Johnson</h6>
                    <small className="text-muted-custom">Product Manager, TechCorp</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-card">
                <div className="mb-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
                <p className="text-muted-custom mb-3">
                  "The best investment we've made for our team. The analytics and reporting features give us insights we
                  never had before."
                </p>
                <div className="d-flex align-items-center">
                  <div 
                    className="bg-primary rounded-circle me-3 d-flex justify-content-center align-items-center text-white"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Michael Chen</h6>
                    <small className="text-muted-custom">CEO, StartupXYZ</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-card">
                <div className="mb-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
                <p className="text-muted-custom mb-3">
                  "Seamless integration with our existing tools and excellent customer support. Highly recommended for
                  any growing team."
                </p>
                <div className="d-flex align-items-center">
                  <div 
                    className="bg-primary rounded-circle me-3 d-flex justify-content-center align-items-center text-white"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Emily Rodriguez</h6>
                    <small className="text-muted-custom">Design Lead, CreativeStudio</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer/Contact Section */}
      <footer id="contact" className="custom-footer">
        <div className="container">
          <div className="row g-4 text-center justify-content-center">
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-3">Product</h5>
              <ul className="list-unstyled">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Integrations</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-3">Company</h5>
              <ul className="list-unstyled">
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-3">Resources</h5>
              <ul className="list-unstyled">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Status</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-3">Legal</h5>
              <ul className="list-unstyled">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">GDPR</a></li>
              </ul>
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom text-center">
            <p className="mb-2">&copy; 2024 Your Company. All rights reserved.</p>
            <div className="footer-social">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      <div 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''} ${hoverStates['scroll-top'] === 'clicked' ? 'btn-clicked' : ''}`}
        onMouseEnter={() => handleButtonHover('scroll-top', true)}
        onMouseLeave={() => handleButtonHover('scroll-top', false)}
        onClick={() => handleButtonClick('scroll-top')}
      >
        <i className="fas fa-arrow-up"></i>
      </div>
    </>
  )
}

export default LandingPage


   