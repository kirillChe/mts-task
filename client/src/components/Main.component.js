import React  from 'react';
import { Layout } from 'antd';
import { Table, Schedule } from 'components';

require('antd/lib/layout/style/css');

const { Header, Footer, Content } = Layout;

const MainComponent = () => {
    return (
        <div>
            <Layout>
                <Header></Header>
                <Content>
                    <div>
                        <Table />
                    </div>
                    <Schedule/>
                </Content>
                <Footer></Footer>
            </Layout>
        </div>
    );
};

export default MainComponent;
