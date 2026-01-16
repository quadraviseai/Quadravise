import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Dummy credentials for local testing
const DUMMY_USERS = [
  { username: "admin", password: "123456", token: "dummy-token-1" },
  { username: "user1", password: "password", token: "dummy-token-2" },
];

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = DUMMY_USERS.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        throw new Error("Invalid username or password");
      }

      // store auth token
      localStorage.setItem("token", user.token);
      localStorage.setItem("isAuthenticated", "true");

      navigate("/crm", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Branding */}
          <div className="hidden items-center justify-center bg-black md:flex">
            <img src="/logo512.png" alt="Quadravise" className="w-40" />
          </div>

          {/* Right: Login Form */}
          <div className="flex flex-col justify-center p-8">
            <h1 className="text-2xl font-semibold text-black">Sign in</h1>
            <p className="mt-2 text-sm text-neutral-500">
              Welcome back! Please enter your details.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-neutral-600">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="font-medium text-black hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Log in"}
              </button>
            </form>

            <div className="mt-6 text-sm text-neutral-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-black hover:underline"
              >
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
