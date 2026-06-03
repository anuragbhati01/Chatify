import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import { MessageCircleIcon, UserIcon, MailIcon, LockIcon, LoaderIcon } from "lucide-react";
import {Link} from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(formData);
  }

  return (
    <div className="flex items-center justify-center p-4 w-full bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row ">
            {/* Form left side */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* Heading text  */}
                <div className="text-center mb-8 ">
                  <MessageCircleIcon className="w-12 h-12 text-slate-400 mb-4 mx-auto" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for new account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative" >
                      <UserIcon className="auth-input-icon" />

                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        placeholder="Ankit Bhai"
                      />
                    </div>
                  </div>
                  {/* EMAIL */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative" >
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="ankit@example.com"
                      />
                    </div>
                  </div>
                  {/* PASSWORD  */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative" >
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <button className="auth-btn" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" /> 
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  <div className="mt-6 text-center">
                    <Link to="/login" className="auth-link" >
                      Already have an account? Login
                    </Link>
                  </div>
                </form>

              </div>
            </div>

            {/* FROM RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center bg-gradient-to-bl p-6 from-slate-800/20 to transparent">
              <div>
                <img src="signup.png" alt="People using mobile phone" className="w-full h-auto object-contain" />

                <div className="text-center mt-6">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>

                  <div className="flex justify-center gap-4 mt-6">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;
