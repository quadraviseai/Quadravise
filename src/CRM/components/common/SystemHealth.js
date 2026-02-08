import { useState, useEffect } from "react";
import { Card, Result, Spin, Tag, Row, Col } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import api from "../../../services/api";

export default function SystemHealth() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchHealth();
    }, []);

    const fetchHealth = async () => {
        try {
            const response = await api.get('/admin/health/');
            setData(response.data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center p-8"><Spin size="large" /></div>;

    if (error || !data) {
        return (
            <Result
                status="500"
                title="System Unavailable"
                subTitle="Sorry, cannot connect to backend health service."
            />
        );
    }

    const { env_name, db_connected, db_host, db_port, db_name, migration_version, server_time } = data;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">System Health Checks</h1>

            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card title="Environment">
                        <Tag color={env_name === 'Production' ? 'red' : 'green'} className="text-lg p-2">
                            {env_name}
                        </Tag>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Database Status">
                        {db_connected ? (
                            <div className="flex items-center text-green-600 font-bold">
                                <CheckCircleOutlined className="mr-2 text-xl" /> Connected
                            </div>
                        ) : (
                            <div className="flex items-center text-red-600 font-bold">
                                <CloseCircleOutlined className="mr-2 text-xl" /> Disconnected
                            </div>
                        )}
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Migration Version">
                        <p className="font-mono text-lg">{migration_version}</p>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="Database Details (Safe View)">
                        <p><strong>Host:</strong> {db_host}</p>
                        <p><strong>Port:</strong> {db_port}</p>
                        <p><strong>DB Name:</strong> {db_name}</p>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="Server Time">
                        <p className="font-mono">{new Date(server_time).toLocaleString()}</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
