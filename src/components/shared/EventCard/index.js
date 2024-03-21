import React from 'react';
import { Card, Typography } from 'antd';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const EventCard = ({ name, description, date, createdBy, eventName }) => {
  return (
    <Card title={name} bordered={false} style={{ width: '100%' }}>
      <Paragraph>
        <Text strong>Name: </Text> {eventName}
      </Paragraph>
      <Paragraph>
        <Text strong>Description: </Text> {description}
      </Paragraph>
      <Paragraph>
        <CalendarOutlined style={{ marginRight: 8 }} />
        <Text strong>Date: </Text> {date}
      </Paragraph>
      <Paragraph>
        <UserOutlined style={{ marginRight: 8 }} />
        <Text strong>Creator Email: </Text> {createdBy}
      </Paragraph>
    </Card>
  );
};

export default EventCard;
