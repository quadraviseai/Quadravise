import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    // TODO: call backend API
    console.log("Reset password for:", email);

    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Branding */}
          <div className="hidden items-center justify-center bg-black md:flex">
            <img src="/logo512.png" alt="Quadravise" className="w-40" />
          </div>

          {/* Right: Form */}
          <div className="flex flex-col justify-center p-8">
            <h1 className="text-2xl font-semibold text-black">
              Forgot Password
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              Enter your email and we’ll send you a reset link.
            </p>

            {!submitted ? (
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-neutral-800"
                >
                  Send Reset Link
                </button>
              </form>
            ) : (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                If an account exists for <strong>{email}</strong>, a reset link
                has been sent.
              </div>
            )}

            <div className="mt-6 text-sm text-neutral-600">
              Remembered your password?{" "}
              <Link
                to="/secure-login"
                className="font-medium text-black hover:underline"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
