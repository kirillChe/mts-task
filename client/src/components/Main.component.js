import React  from 'react';
import { Layout } from 'antd';
import { Table } from 'components';

const { Header, Footer, Content } = Layout;

const MainComponent = () => {
    return (
        <div>
            <Layout>
                <Header>Header</Header>
                <Content>
                    <div>
                        <Table />
                    </div>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    );
};

export default MainComponent;
