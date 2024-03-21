import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Flex, Layout } from 'antd';
import store from './redux/store';
import AllEventsPage from './components/feature/AllEventsPage';
import MyEventsPage from './components/feature/MyEvents';
import Sidebar from './components/feature/Sidebar';

import '@aws-amplify/ui-react/styles.css';
import './App.scss'

const { Content } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Flex>
        <Layout className='layout'>
          <Sidebar />
          <Layout>
            <Content className="content"><BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate replace to="/all-events" />} />
                <Route path="/my-events" element={<MyEventsPage />} />
                <Route path="/all-events" element={<AllEventsPage />} />
              </Routes>
            </BrowserRouter>
            </Content>
          </Layout>
        </Layout>
      </Flex >
    </Provider >
  );
}

export default withAuthenticator(App);