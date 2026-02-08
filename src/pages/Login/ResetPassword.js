import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { LockOutlined } from "@ant-design/icons";
import api from "../../services/api";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onFinish = async (values) => {
        setLoading(true);
        setError("");
        try {
            await api.post('/auth/reset-password/', {
                token: token,
                new_password: values.password,
                confirm_password: values.confirm,
            });
            setSubmitted(true);
            setTimeout(() => navigate('/secure-login'), 3000);
        } catch (err) {
            setError(err.response?.data?.non_field_errors?.[0] || "Failed to reset password. Token may be invalid or expired.");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
                <Alert message="Invalid Link" description="No reset token provided." type="error" showIcon />
            </div>
        )
    }

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
                            Reset Password
                        </h1>
                        <p className="mb-6 text-sm text-neutral-500">
                            Enter your new password below.
                        </p>

                        {!submitted ? (
                            <>
                                {error && <Alert message={error} type="error" showIcon className="mb-4" />}
                                <Form
                                    name="reset_password"
                                    onFinish={onFinish}
                                    layout="vertical"
                                    size="large"
                                >
                                    <Form.Item
                                        name="password"
                                        label="New Password"
                                        rules={[
                                            { required: true, message: "Please input your password!" },
                                            { min: 8, message: "Password must be at least 8 characters." }
                                        ]}

                                    >
                                        <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirm"
                                        label="Confirm Password"
                                        dependencies={['password']}
                                        rules={[
                                            { required: true, message: 'Please confirm your password!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading} block className="bg-black hover:bg-neutral-800 border-black">
                                            Reset Password
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </>
                        ) : (
                            <Alert
                                message="Success"
                                description="Your password has been reset. Redirecting to login..."
                                type="success"
                                showIcon
                            />
                        )}

                        <div className="mt-6 text-center text-sm text-neutral-600">
                            <Link to="/secure-login" className="font-medium text-black hover:underline">
                                Back to login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
