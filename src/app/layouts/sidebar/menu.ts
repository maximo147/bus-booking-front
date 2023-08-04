import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 30,
        label: 'MENUITEMS.EMAIL.TEXT',
        icon: 'bx-envelope',
        subItems: [
            {
                id: 31,
                label: 'MENUITEMS.EMAIL.LIST.INBOX',
                link: '/users/role',
                parentId: 30
            },
            {
                id: 32,
                label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                link: '/users/user',
                parentId: 30
            }
        ]
    },
    {
        id: 37,
        label: 'MENUITEMS.INVOICES.TEXT',
        icon: 'bx-receipt',
        subItems: [
            {
                id: 38,
                label: 'MENUITEMS.INVOICES.LIST.INVOICELIST',
                link: '/chat/get',
                parentId: 37
            }
        ]
    },
    {
        id: 40,
        label: 'MENUITEMS.PROJECTS.TEXT',
        icon: 'bx-briefcase-alt-2',
        subItems: [
            {
                id: 41,
                label: 'MENUITEMS.PROJECTS.LIST.GRID',
                link: '/buses/type-seat',
                parentId: 40
            },
            {
                id: 42,
                label: 'MENUITEMS.PROJECTS.LIST.PROJECTLIST',
                link: '/buses/type-seat-detail',
                parentId: 40
            },
            {
                id: 43,
                label: 'MENUITEMS.PROJECTS.LIST.OVERVIEW',
                link: '/buses/bus',
                parentId: 40
            }
        ]
    },
    {
        id: 45,
        label: 'MENUITEMS.TASKS.TEXT',
        icon: 'bx-task',
        subItems: [
            {
                id: 46,
                label: 'MENUITEMS.TASKS.LIST.TASKLIST',
                link: '/booking/itinerary',
                parentId: 45
            }
        ]
    },
    {
        id: 49,
        label: 'MENUITEMS.CONTACTS.TEXT',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 50,
                label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
                link: '/booking/booking',
                parentId: 49
            },
            {
                id: 51,
                label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                link: '/booking/my-booking',
                parentId: 49
            }
        ]
    }
];

