import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { MailOutlined } from "@ant-design/icons";
import api from "../../services/api";

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    setError("");
    try {
      await api.post('/auth/forgot-password/', { email: values.email });
      setEmail(values.email);
      setSubmitted(true);
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Branding */}
          <div className="hidden items-center justify-center bg-black md:flex flex-col p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Quadravise Finance</h2>
            <p className="text-center text-neutral-400">Secure Financial Management System</p>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col justify-center p-8">
            <h1 className="text-2xl font-semibold text-black mb-2">
              Forgot Password
            </h1>

            <p className="mb-6 text-sm text-neutral-500">
              Enter your email and we’ll send you a reset link.
            </p>

            {!submitted ? (
              <>
                {error && <Alert message={error} type="error" showIcon className="mb-4" />}
                <Form
                  name="forgot_password"
                  onFinish={onFinish}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your Email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="you@example.com" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block className="bg-black hover:bg-neutral-800 border-black">
                      Send Reset Link
                    </Button>
                  </Form.Item>
                </Form>
              </>
            ) : (
              <Alert
                message="Check your email"
                description={<span>If an account exists for <strong>{email}</strong>, a reset link has been sent.</span>}
                type="success"
                showIcon
              />
            )}

            <div className="mt-6 text-center text-sm text-neutral-600">
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
