import { FileOutlined, PieChartOutlined, UserOutlined, TeamOutlined, DesktopOutlined, PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const { Header, Content, Footer, Sider } = Layout;
const { Text, Link } = Typography;

const adminItems = [
    {
        key: "home",
        icon: <PieChartOutlined />,
        label: (
            <a href='/admin'>Home</a>
        )
    },
    {
        key: "regitrationReq",
        icon: <DesktopOutlined />,
        label: (
            <a href='/admin/regitrationReq'>Requests</a>
        )
    },
    {
        key: "students",
        icon: <TeamOutlined />,
        label: (
            <a href='/admin/students'>Students</a>
        )
    },
    {
        key: "profile",
        icon: <UserOutlined />,
        label: (
            <a href='/admin/profile'>Profile</a>
        )
    },
    {
        key: "settings",
        icon: <SettingOutlined />,
        label: (
            <a href='/admin/settings'>Settings</a>
        )
    },
];
const studentItems = [
    {
        key: "home",
        icon: <PieChartOutlined />,
        label: (
            <a href='/student'>Home</a>
        )
    },
    {
        key: "predictionForm",
        icon: <DesktopOutlined />,
        label: (
            <a href='/student/predictionForm'>Prediction Form</a>
        )
    },
    {
        key: "settings",
        icon: <SettingOutlined />,
        label: (
            <a href='/student/settings'>Settings</a>
        )
    },
];
const BaseLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('home')
    const { authed, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        let items = authed.admin ? adminItems : studentItems
        let selected = items.find(item => location.pathname.includes(item.key))
        setSelectedMenuItem(selected?.key || "home")
    }, [])
    const onLogout = async () => {
        let res = await logout()
        if (res) {
            navigate('/login')
        }
    }
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible theme='dark' collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        height: 32,
                        width: "95vw",
                        margin: 16,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <img style={{ width: '2.5rem', height: 'auto' }} src="/logo.png" alt='logo' />
                    <Button
                        danger
                        icon={<PoweroffOutlined />}
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                </div>
                <Menu mode="inline" theme='dark' items={authed.admin ? adminItems : studentItems} selectedKeys={selectedMenuItem} />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        paddingLeft: 20,
                        background: colorBgContainer,
                    }}
                >
                    <Text type="secondary" style={{ fontSize: '1rem' }}>Campus Placement Prediction System</Text>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {props.children}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Created by @Group No 18
                </Footer>
            </Layout>
        </Layout>
    );
};
export default BaseLayout;