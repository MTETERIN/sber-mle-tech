import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

// pages
const INN = React.lazy(() => import('../pages/mdlp/INN'));
const Pays = React.lazy(() => import('../pages/mdlp/Pays'));
const Sgtin = React.lazy(() => import('../pages/mdlp/Sgtin'));
const SgtinNotPaid = React.lazy(() => import('../pages/mdlp/SgtinNotPaid'));

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/sber/inn" />,
    route: Route,
};


// pages
const pageRoutes = {
    path: '/sber',
    name: 'Сбер',
    icon: 'uil-copy-alt',
    children: [
        {
                path: '/sber/inn',
                name: 'ИНН',
                component: INN,
                route: Route,
        },
        {
                path: '/sber/pays',
                name: 'Платежи',
                component: Pays,
                route: Route,
        },
        {
                path: '/sber/sgtin',
                name: 'Прогноз по ИНН',
                component: Sgtin,
                route: Route,
        },
        {
                path: '/sber/sgtin-not-paid',
                name: 'Прогнозирование',
                component: SgtinNotPaid,
                route: Route,
        },
    ]
};

// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [rootRoute, pageRoutes];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allRoutes, allFlattenRoutes };
