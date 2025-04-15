<?php

use Noks\IPDO;
use Noks\Enum\StatusCRMLead as StatusCRMLeadEnum;

// TODO проверить на неиспользуемые функции

/**
 * мы получаем количество заявок по каждой странице
 */
function getPagesCountAppl(int $site_id): array
{
    $sql = 'SELECT sp.*, COUNT(cl.lead_id) as cnt_appl FROM sites_pages as sp
    LEFT OUTER JOIN crm_leads as cl
    ON sp.id = cl.lead_id_page
    WHERE sp.id_site = :id_site
    GROUP BY sp.id
    ORDER BY sp.id DESC';

    $res = IPDO::exec($sql, [
        'id_site' => $site_id
    ], 2);
    return $res;
}


// ------------------------------------ МАНИПУЛЯЦИИ С СТАТУСАМИ САЙТА

/**
 * отделяем пользовательские статусы от дефолтных
 */
function prepareStatuses(array $statuses): array
{
    $def_status = StatusCRMLeadEnum::self()->getAllStatus();
    $default = \array_filter($statuses, fn ($s) => \in_array($s['status_id'], $def_status));
    $default = \array_combine(
        \array_column($default, 'status_id'),
        $default
    );

    $statuses = \array_filter($statuses, fn ($s) => !\in_array($s['status_id'], $def_status));

    \array_unshift($statuses, $default[1]);
    \array_unshift($statuses, $default[0]);
    \array_push($statuses, $default[2]);
    \array_push($statuses, $default[3]);

    $statuses = \array_combine(
        \array_column($statuses, 'status_id'),
        $statuses
    );

    return $statuses;
}
