import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/images/logo.png"; // User requested logo.png

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const onFinish = async (values) => {
    setError("");
    setLoading(true);
    const result = await login(values.email, values.password);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Dynamic Background Elements - Blue Gradient Theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`relative z-10 w-full max-w-md px-6 transition-all duration-1000 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>

        {/* Logo & Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-20 w-20 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 mb-4 transform hover:scale-105 transition-transform duration-300 p-4">
            <img src={Logo} alt="Quadravise" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-400 tracking-tight">Quadravise</h1>
          <p className="text-blue-200/60 mt-2 text-sm tracking-wide uppercase">Financial Intelligence</p>
        </div>

        {/* Glass Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-1">Welcome Back</h2>
            <p className="text-blue-200/60 text-sm">Sign in to access your dashboard</p>
          </div>

          {error && (
            <Alert message={error} type="error" showIcon className="mb-6 bg-red-500/10 border-red-500/20 text-red-200" />
          )}

          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className="space-y-2"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-blue-300" />}
                placeholder="Email Address"
                className="bg-white/5 border-white/10 text-white placeholder-blue-200/30 hover:border-blue-400/50 focus:border-blue-500 hover:bg-white/10 transition-all rounded-xl h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-blue-300" />}
                placeholder="Password"
                className="bg-white/5 border-white/10 text-white placeholder-blue-200/30 hover:border-blue-400/50 focus:border-blue-500 hover:bg-white/10 transition-all rounded-xl h-12"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between items-center text-sm">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-blue-200/60 hover:text-white transition-colors">Remember me</Checkbox>
                </Form.Item>

                <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 transition-all transform hover:-translate-y-0.5"
              >
                Sign In <ArrowRightOutlined className="ml-1" />
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-xs">
            Don't have an account? <span className="text-slate-400 cursor-not-allowed">Contact Administrator</span>
          </p>
        </div>
      </div>

      {/* CSS Animation fix for blobs if not in globally */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        /* Custom Antd Input Overrides for Dark Mode */
        .ant-input-affix-wrapper {
            background-color: rgba(255, 255, 255, 0.05) !important;
            border-color: rgba(255, 255, 255, 0.1) !important;
            color: white !important;
        }
        .ant-input {
            background-color: transparent !important;
            color: white !important;
        }
        .ant-input-password-icon {
            color: rgba(255, 255, 255, 0.4) !important;
        }
        .ant-input::placeholder {
            color: rgba(255, 255, 255, 0.4) !important;
        }
        .ant-checkbox-wrapper {
            color: rgba(255, 255, 255, 0.5);
        }
        .ant-checkbox-checked .ant-checkbox-inner {
            background-color: #3b82f6; /* blue-500 */
            border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
}
