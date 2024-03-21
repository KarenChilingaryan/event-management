import { AppstoreOutlined, CalendarOutlined } from "@ant-design/icons";

export const sidebarPaths = [
    {
        name: 'All Events',
        path: '/all-events',
        key: '2',
        icon: <CalendarOutlined />
    },
    {
        name: 'My Events',
        path: 'my-events',
        key: '1',
        icon: <AppstoreOutlined />
    },
]