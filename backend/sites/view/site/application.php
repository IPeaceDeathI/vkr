<?php

use Noks\Rights\Check\Site as RSite;

/**
 * @var string $header_site
 * @var string $menu_site
 * @var string $beetween_date
 * @var string $pagination
 * @var int $count_appl
 */

?>
<!-- header_site start -->
<?= $header_site ?>
<!-- header_site end -->
<!-- menu_site start -->
<?= $menu_site ?>
<!-- menu_site end -->


<div class="wrapper-applications-site">
    <div class="wrapper-filter">
        <div class="filter-page">
            <select>
                <?php foreach ($filter as $page) : ?>
                    <option data-url="<?= $page['url'] ?>" <?= ($page['selected'] ? 'selected'  : '') ?>><?= $page['title'] ?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="close">
            <div class="btn_close" title="Сбросить фильтр"></div>
            <input type="text" readonly class="filter-date_" value="<?= $_GET['period'] ?? $beetween_date ?>">
        </div>
    </div>

    <div class="wrapper-chart">
        <canvas id="appl_chart" data-date="<?= $data_chart['date_appl_chart'] ?>" data-values="<?= $data_chart['values_appl_chart'] ?>" height="84%"></canvas>
    </div>

    <div class="wrapper-applications">

        <?php foreach ($applications as $appl) : ?>

            <div class="application">
                <div class="left">
                    <div class="info">
                        <?php if ($appl['lead_name'] != '') : ?>
                            <span class="name"><?= $appl['lead_name'] ?></span>
                            <span class="dot">•</span>
                        <?php endif; ?>
                        <?php if ($appl['lead_email'] != '') : ?>
                            <span class="mail"><?= $appl['lead_email'] ?></span>
                            <span class="dot">•</span>
                        <?php endif; ?>
                        <span class="date" title="<?= $appl['lead_date'] ?>"><?= $appl['lead_date_view'] ?></span>
                        <span class="dot">•</span>
                        <span title="Идентификатор">#<?= $appl['lead_id'] ?></span>
                    </div>
                    <div class="phone" <?= (!RSite::getInstance()->allowed_show_lead() ? ' title="Оплатите тариф"' : '') ?>>
                        <?= $appl['lead_phone'] ?>
                    </div>
                </div>
                <div class="right">
                    <div class="status" style="background-color: #<?= (isset($statuses[$appl['lead_status']]) ? $statuses[$appl['lead_status']]['status_color'] : 'FFB1B1') ?>;">
                        <select data-save_status="<?= $appl['lead_status'] ?>" data-id_page="<?= $appl['lead_id_page'] ?>" data-id_appl="<?= $appl['lead_id'] ?>">
                            <?php foreach ($statuses as $status) : ?>
                                <option <?= ($status['status_id'] == 0 ? 'disabled' : '') ?> data-color="<?= $status['status_color'] ?>" <?= ($status['status_id'] == $appl['lead_status'] ? 'selected' : '') ?> value="<?= $status['status_id'] ?>"><?= $status['status_name'] ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
            </div>

        <?php endforeach; ?>

    </div>

    <div class="wrapper-pagination">
        <div class="counter">
            Найдено: <?= $count_appl ?>
        </div>

        <div class="pages">
            <?= $pagination ?>
        </div>
    </div>

</div>