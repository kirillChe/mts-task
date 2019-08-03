import React, { Component } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';

require('antd/lib/input/style/css');
require('antd/lib/select/style/css');
require('antd/lib/button/style/css');
require('antd/lib/message/style/css');

const { Option } = Select;

class PeriodInput extends Component {
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    state = {
        number: this.props.value.number || 0,
        period: this.props.value.period || 'hour',
    };

    handleNumberChange = e => {
        let number = e.target.value;
        this.setState({ number });
        this.triggerChange({ number });
    };

    handlePeriodChange = period => {
        this.setState({ period });
        this.triggerChange({period});
    };

    triggerChange = changedValue => {
        // Should provide an event to pass value to Form.
        const { onChange } = this.props;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    };

    render() {
        const { size } = this.props;
        const { state } = this;
        return (
            <span>
        <Input
            type="number"
            size={size}
            min={0}
            value={state.number}
            onChange={this.handleNumberChange}
            style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
            value={state.period}
            size={size}
            style={{ width: '32%' }}
            onChange={this.handlePeriodChange}
        >
          <Option value="days">Days</Option>
          <Option value="hours">Hours</Option>
        </Select>
      </span>
        );
    }
}

class Demo extends Component {
    state = { number: 0, period: 'hour' };

    handleSubmit = async e => {
        e.preventDefault();
        await this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                try {
                    const response = await axios.put('/api/crons', {
                        numberValue: values.data.number,
                        periodValue: values.data.period,
                    });
                    console.log('Cron: ', response.data);
                    if (response && response.status === 204) {
                        message.success('Настройки уведомления изменены');
                    } else {
                        message.error('Что-то пошло не так');
                    }
                } catch (e) {
                    message.error('Что-то пошло не так');
                    console.log('Cannot configure cron: ', e);
                }

            }
        });
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`/api/crons`);
            if (response.status === 200) {
                this.setState({
                    number: response.data.numberValue,
                    period: response.data.periodValue,
                });
            } else {
                console.log('Cannot configure cron');
            }
        } catch (e) {
            console.log('Cannot configure cron: ', e);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item label="Отправить поздравление с днем рождения за ">
                    {getFieldDecorator('data', {
                        initialValue: this.state,
                        rules: [],
                    })(<PeriodInput />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Set
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const Schedule = Form.create({ name: 'customized_form_controls' })(Demo);

export default Schedule;