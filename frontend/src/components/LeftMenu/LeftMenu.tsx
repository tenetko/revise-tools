import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import Icon from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {ReactComponent as AirateLogo} from "../../logos/Airate.svg";

const LeftMenu: React.FC = () => {

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed)
    };

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
        >
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={[document.location.pathname]} mode="inline">
                <Menu.Item key="/airate">
                    <Link to="/airate">
                        <Icon component={AirateLogo} style={{fontSize: '20px'}}/>
                        <span>Airate</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    )
};

export default LeftMenu;