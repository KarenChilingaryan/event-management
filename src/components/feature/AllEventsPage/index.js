import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input, Space, Button } from 'antd';
import EventCard from '../../shared/EventCard';
import { fetchEvents } from '../../../redux/actions/allEventActions';

const { Search } = Input;

const AllEventsPage = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.allEvents);
  const [view, setView] = useState('all')
  const [searchValue, setSearchValue] = useState('')
  const getEvents = (params) => {
    dispatch(fetchEvents(params));
  }

  useEffect(() => {
    getEvents()
  }, [])

  const onSearch = (value) => {
    getEvents({
      searchQuery: value,
    })
    setSearchValue(value)
  };

  const handleViewChange = (newView) => {
    getEvents({
      isUpcoming: newView === 'all' ? '' : "true",
      searchQuery: searchValue,
    })
    setView(newView);
  };

  return (
    <div className="site-card-wrapper" style={{ margin: '20px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Button type={view === 'all' ? 'primary' : 'default'} onClick={() => handleViewChange('all')}>
          All Events
        </Button>
        <Button type={view === 'upcoming' ? 'primary' : 'default'} onClick={() => handleViewChange('upcoming')} style={{ marginLeft: '10px' }}>
          Upcoming
        </Button>
      </div>
      <Space direction="vertical">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>
      <Row gutter={[16, 16]}>
        {events.map(event => (
          <Col key={event.id} xs={24} sm={12} md={12} lg={8} xl={6}>
            <EventCard {...event} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllEventsPage;