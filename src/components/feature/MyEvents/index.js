import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthSession } from '@aws-amplify/auth';
import { Button, Modal, Form, Input, DatePicker, Space, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import uniqid from 'uniqid';
import { createEvent, editEvent, fetchOwnedEvents, removeEvent } from '../../../redux/actions/eventActions';
import EventCard from '../../shared/EventCard';

import './my-events.scss'

const MyEventsPage = () => {
    const dispatch = useDispatch()
    const [ownerEmail, setOwnerEmail] = useState('');
    const events = useSelector((state) => state.events.events);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const showModal = (event = null) => {
        setEditingEvent(event);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        dispatch(removeEvent(id))
    };

    const handleOk = async (values) => {
        const params = {
            ...values,
            createdBy: ownerEmail,
            date: (typeof values.date == 'string') ? values.date : values.date.toISOString()
        }
        if (editingEvent) {
            dispatch(editEvent({
                ...params,
                eventId: editingEvent.eventId,
            }))
        } else {
            dispatch(createEvent({
                ...params,
                eventId: uniqid(),
            }))
        }
        setIsModalVisible(false);
        setEditingEvent(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingEvent(null);
    };

    const [form] = Form.useForm();

    const getOwnedEvents = async () => {
        const currentUser = await fetchAuthSession();
        const email = currentUser.tokens.idToken.payload.email;
        dispatch(fetchOwnedEvents({ ownerEmail: email }))
        setOwnerEmail(email)
    }

    useEffect(() => {
        getOwnedEvents()
    }, [])

    return (
        <div className="events-container">
            <Button type="primary" onClick={() => showModal()} icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
                Add Event
            </Button>
            <Modal title={editingEvent ? "Edit Event" : "Add Event"} open={isModalVisible} onOk={() => form.submit()} onCancel={handleCancel}>
                <Form
                    form={form}
                    initialValues={{
                        eventName: editingEvent ? editingEvent.eventName : '',
                        description: editingEvent ? editingEvent.description : '',
                        date: editingEvent ? moment(editingEvent.date) : moment(),
                    }}
                    onFinish={handleOk}
                >
                    <Form.Item
                        name="eventName"
                        label="Event Name"
                        rules={[{ required: true, message: 'Please input the event name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Event Date"
                        rules={[{ required: true, message: 'Please select the event date!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Form>
            </Modal>
            <Row gutter={[16, 24]}>
                {events.map(event => (
                    <Col key={event.id} xs={24} sm={12} md={12} lg={8} xl={6}>
                        <EventCard {...event} />
                        <Space style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={() => showModal(event)} icon={<EditOutlined />}>Edit</Button>
                            <Button onClick={() => handleDelete(event.eventId)} icon={<DeleteOutlined />} danger>Delete</Button>
                        </Space>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default MyEventsPage;
