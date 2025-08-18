import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

function LoginPage() {
  // For navigation between pages
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    email: 'test@example.com',
    password: 'password123'
  })
  
  // State for button interactions
  const [hoverStates, setHoverStates] = useState({})
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login form submitted:', formData)
    // Here you would typically handle authentication
    // For demo purposes, redirect to dashboard after "login"
    navigate('/dashboard')
  }
  
  // Handle button hover
  const handleButtonHover = (buttonId, isHovering) => {
    setHoverStates(prev => ({
      ...prev,
      [buttonId]: isHovering
    }))
  }
  
  // Handle button click with feedback
  const handleButtonClick = (buttonId) => {
    // Visual feedback for button click
    setHoverStates(prev => ({
      ...prev,
      [buttonId]: 'clicked'
    }))
    
    // Reset after animation
    setTimeout(() => {
      setHoverStates(prev => ({
        ...prev,
        [buttonId]: false
      }))
    }, 300)
    
    console.log(`Button ${buttonId} clicked`)
  }

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
          
          /* Shadow Effect */
          .navbar {
              box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          }

          .login-section {
              background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
              padding: 80px 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
          }

          .login-card {
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
              padding: 40px;
              transition: all 0.3s ease;
          }

          .form-control {
              border-radius: 8px;
              padding: 12px;
              border: 1px solid #e9ecef;
              transition: all 0.3s ease;
          }

          .form-control:focus {
              border-color: #00c2ff;
              box-shadow: 0 0 0 0.25rem rgba(0, 194, 255, 0.25);
          }

          .form-label {
              font-weight: 500;
              color: #495057;
          }

          .login-divider {
              display: flex;
              align-items: center;
              margin: 20px 0;
          }

          .login-divider::before,
          .login-divider::after {
              content: '';
              flex: 1;
              border-bottom: 1px solid #e9ecef;
          }

          .login-divider span {
              padding: 0 10px;
              color: #6c757d;
              font-size: 0.9rem;
          }

          .social-login {
              display: flex;
              justify-content: center;
              gap: 15px;
              margin-bottom: 20px;
          }

          .social-btn {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #e9ecef;
              background-color: #fff;
              transition: all 0.3s ease;
              color: #495057;
          }

          .social-btn:hover {
              transform: translateY(-3px);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .signup-link {
              text-align: center;
              margin-top: 20px;
          }

          .signup-link a {
              color: #00c2ff;
              text-decoration: none;
              font-weight: 500;
              transition: all 0.3s ease;
          }

          .signup-link a:hover {
              text-decoration: underline;
          }

          
        `}
      </style>

      {/* Login Section */}
      <section className="login-section position-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div className="login-card">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">
                    <a href="#" className="text-decoration-none" onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                    }}>
                      <span className="brand-highlight">Code</span><span style={{ color: '#000' }}>Collab</span>
                    </a>
                  </h2>
                  <p className="text-muted">Welcome back! Please login to your account.</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  
                  <div className="d-flex justify-content-between mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label text-muted" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-decoration-none" style={{ color: '#00c2ff' }}>Forgot password?</a>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`btn btn-primary w-100 py-2 mb-3 ${hoverStates['login-btn'] === 'clicked' ? 'btn-clicked' : ''}`}
                    onMouseEnter={() => handleButtonHover('login-btn', true)}
                    onMouseLeave={() => handleButtonHover('login-btn', false)}
                    onClick={() => handleButtonClick('login-btn')}
                  >
                    Login
                  </button>
                </form>
                
                <div className="login-divider">
                  <span>OR</span>
                </div>
                
                <div className="signup-link">
                  <p className="mb-0">Don't have an account? <a href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate('/signup');
                  }}>Sign up</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginPage
