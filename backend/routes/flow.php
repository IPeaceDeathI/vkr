<?php

/**
 * @param \Noks\Controller\API\Flow\TariffOption\FlowTariffOptionStore
 * @param \Noks\Middleware\API\Flow\TariffOption\FlowTariffOptionAPI
 */
route(
    'POST',
    '/api/flows/{int_unsigned}/tariff_options/{int_unsigned}',
    '\Noks\Controller\API\Flow\TariffOption\FlowTariffOptionStore@__invoke',
    '\Noks\Middleware\API\Flow\TariffOption\FlowTariffOptionAPI@store'
);

/**
 * @param \Noks\Controller\API\Flow\TariffOption\FlowTariffOptionDelete
 * @param \Noks\Middleware\API\Flow\TariffOption\FlowTariffOptionAPI
 */
route(
    'DELETE',
    '/api/flows/{int_unsigned}/tariff_options/{int_unsigned}',
    '\Noks\Controller\API\Flow\TariffOption\FlowTariffOptionDelete@__invoke',
    '\Noks\Middleware\API\Flow\TariffOption\FlowTariffOptionAPI@delete'
);

/**
 * @param \Noks\Controller\API\Flow\TariffOption\FlowTariffOptionUpdate
 * @param \Noks\Middleware\API\Flow\TariffOption\FlowTariffOptionAPI
 */
route(
    'PUT',
    '/api/flows/{int_unsigned}/tariff_options/{int_unsigned}',
    '\Noks\Controller\API\Flow\TariffOption\FlowTariffOptionUpdate@update',
    '\Noks\Middleware\API\Flow\TariffOption\FlowTariffOptionAPI@update'
);

/**
 * @param \Noks\Controller\API\Flow\Method\FlowMethodGetInfoCurrentTariff
 * @param \Noks\Middleware\API\Flow\FlowAPI
 */
route(
    'GET',
    '/api/flow/method/get_info_current_tariff',
    '\Noks\Controller\API\Flow\Method\FlowMethodGetInfoCurrentTariff@main',
    '\Noks\Middleware\API\Flow\FlowAPI@getInfoCurrentTariff'
);
