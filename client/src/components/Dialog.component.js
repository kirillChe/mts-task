import React, { Component }  from 'react';

import {
    Modal,
    Button,
    Form,
    DatePicker,
    Input
} from 'antd';
import moment from 'moment';
import * as R from 'ramda';

import { Avatar } from 'components';

require('antd/lib/button/style/css');
require('antd/lib/modal/style/css');
require('antd/lib/form/style/css');
require('antd/lib/icon/style/css');
require('antd/lib/date-picker/style/css');

const UserCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends Component {
        render() {
            const { visible, onCancel, onCreate, form, modalText, user, setFile } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title={modalText}
                    okText="Submit"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label={"First Name"}>
                            {getFieldDecorator('firstName', {
                                initialValue: user.firstName,
                                rules: [],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label={"Last Name"}>
                            {getFieldDecorator('lastName', {
                                initialValue: user.lastName,
                                rules: [],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Birth Date">
                            {getFieldDecorator('birthDate', {
                                initialValue: moment(user.birthDate),
                                rules: [
                                    {
                                        type: 'object'
                                    }
                                ],
                            })(<DatePicker />)}
                        </Form.Item>
                        <Form.Item label="E-mail">
                            {getFieldDecorator('email', {
                                initialValue: user.email,
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Phone">
                            {getFieldDecorator('phone', {
                                initialValue: user.phone,
                                rules: [],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label={"Position"}>
                            {getFieldDecorator('position', {
                                initialValue: user.position,
                                rules: [],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Upload">
                            <Avatar imageUrl={user.avatar} setFile={setFile} />
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class DialogComponent extends Component {
    state = {
        visible: false,
        avatar: null
    };

    setFile = avatar => {
        this.setState({avatar});
    };

    showModal = (e) => {
        e.preventDefault();
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleOk = async (e) => {
        e.preventDefault();
        const { form } = this.formRef.props;
        const userId = this.props.user && this.props.user.id;
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });

        await form.validateFields(async (err, values) => {
            if (err)
                return;

            console.log('Received values of form: ', values);
            let data = R.merge(values, {avatar: this.state.avatar});

            this.props.handleSubmit({data, userId});

            form.resetFields();
            this.setState({
                avatar: null,
                visible: false,
                confirmLoading: false,
            });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const { buttonName, isButton, user = {} } = this.props;
        return (
            <div>
                {isButton ?
                    (<Button type={"primary"} onClick={this.showModal}>
                        {buttonName}
                    </Button>) :
                    (<a href="" onClick={this.showModal}>
                        {buttonName}
                    </a>)
                }
                <UserCreateForm
                    setFile={this.setFile}
                    user={user}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleOk}
                />
            </div>
        );
    }
}

export default DialogComponent;
