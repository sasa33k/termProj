import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.js';
import './style.css';

import { ConfigProvider } from 'antd';

const root = createRoot(document.getElementById('react-container'));
root.render(
    <ConfigProvider
        theme={{
            components: {
                Button: {
                    borderRadius: 0,
                },
                Typography: {
                    colorTextHeading: "#1890ff",
                },
            },
            token: {
                "colorPrimary": "#ae17ff"
            },
        }}
    >    

        <App />
    </ConfigProvider>

);