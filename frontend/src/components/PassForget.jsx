import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";
import "../pages/style.css";

const PassForget = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Step 1: Check if email exists
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      const data = await authAPI.checkEmailExists(email);

      if (data.error || !data.exists) {
        setError(data.error || "Email does not exist");
        showToast(data.error || "Email does not exist. Please register.", 'error');
        setTimeout(() => {
          navigate("/register");
        }, 2000);
        return;
      }

      showToast("Email verified! OTP sent.", 'success');
      setStep(2);
    } catch (err) {
      console.error("Error checking email:", err);
      setError("Error checking email");
      showToast("Error checking email", 'error');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("OTP is required");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      const data = await authAPI.verifyOTP(email, otp);

      if (data.error) {
        setError(data.error);
        showToast(data.error, 'error');
        return;
      }

      showToast("OTP verified successfully!", 'success');
      setStep(3);
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Error verifying OTP");
      showToast("Error verifying OTP", 'error');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const data = await authAPI.resetPassword(email, otp, newPassword, confirmPassword);

      if (data.error) {
        setError(data.error);
        showToast(data.error, 'error');
        return;
      }

      showToast("Password reset successfully! Redirecting to login...", 'success');
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Error resetting password");
      showToast("Error resetting password", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      const data = await authAPI.sendOTP(email);

      if (data.error) {
        showToast(data.error, 'error');
        return;
      }

      showToast("OTP sent again! Check your email.", 'success');
    } catch (err) {
      console.error("Error resending OTP:", err);
      showToast("Error resending OTP", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-body">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-content">
            <span className="toast-message">{toast.message}</span>
            <button 
              className="toast-close"
              onClick={() => setToast(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="wrapper" style={{ width: '420px' }}>
        <form onSubmit={step === 1 ? handleCheckEmail : step === 2 ? handleVerifyOTP : handleResetPassword}>
          <h2>Reset Password</h2>

          {/* Progress Indicator */}
          <div className="progress-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Email</div>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">OTP</div>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Password</div>
            </div>
          </div>

          {error && (
            <div className="error-message" style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
              {error}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button type="submit" className="button-btn" disabled={loading}>
                {loading ? "Checking..." : "Continue"}
              </button>
            </>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <>
              <div className="input-box">
                <label style={{ fontSize: "14px", color: "#666", marginBottom: "5px", display: "block" }}>
                  Email: {email}
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength="6"
                  required
                  disabled={loading}
                />
              </div>
              <button type="submit" className="button-btn" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button 
                  type="button" 
                  onClick={handleResendOTP}
                  disabled={loading}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#667eea",
                    cursor: "pointer",
                    fontSize: "14px",
                    textDecoration: "underline"
                  }}
                >
                  Resend OTP
                </button>
              </div>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button type="submit" className="button-btn" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}

          <div className="register-link" style={{ marginTop: "15px" }}>
            <p>
              Remember your password? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PassForget;
