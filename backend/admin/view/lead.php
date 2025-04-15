<?php

use Noks\Rights\Check\Site as RSite;

/**
 * @var string $header_site
 * @var string $menu_site
 * @var string $beetween_date
 * @var string $pagination
 * @var int $count_appl
 */

    // $path = VERSION . '/admin/view/lead/' . $_SPLIT[2] . '.php';

    // if(file_exists($path)){
    //     include $path;
    //     exit();
    // }
?>


<!-- <div class="wrapper-applications-site">
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

</div> -->


<!-- ######################################################################################## -->


<div class="admin-content-wrapper scrollable-content" id="app">
  <div data-is="admin-lead-list" class="admin-content admin-lead-list container fluid fade-in-animation ">
    <header>
      <div class="flexbe-title text-title"> Заявки </div>


      <!-- <div data-is="proxy" is="admin-lead-list-filters" sprite="/<?=VERSION?>/admin/resources/images/lead.svg?af9bc055" style="" class="admin-lead-list-filters ">
        <div class="flexbe-button is-secondary filled rounded">
          <svg is="flexbe-icon" icon="filter-lead" sprite="/<?=VERSION?>/admin/resources/images/lead.svg?af9bc055" class="flexbe-icon size-16 ">
            <use href="/<?=VERSION?>/admin/resources/images/lead.svg?af9bc055#filter-lead"></use>
          </svg><span class="flexbe-text text-medium">Фильтр</span>
          <div is="proxy" data-is="dropdown">
            <div class="toggle-helper"></div>
          </div>
        </div>
      </div> -->

      <!-- <div data-is="proxy" is="admin-lead-list-export" sprite="/<?=VERSION?>/admin/resources/images/lead.svg?af9bc055" style="" class="admin-lead-list-export ">
        <div class="flexbe-button filled is-secondary rounded tooltipstered" data-tip="Экспорт заявок">
          <svg is="flexbe-icon" class="flexbe-icon size-16 m0" size="16" icon="file-download" sprite="/<?=VERSION?>/admin/resources/images/lead.svg?af9bc055">
            <use href="/<?=VERSION?>/admin/resources/images/lead.svg?af9bc055#file-download"></use>
          </svg>
          <div is="proxy" data-is="dropdown">
            <div class="toggle-helper"></div>
          </div>
        </div>
      </div> -->

      <!-- <div class="flexbe-separator"></div>
      <div data-is="admin-lead-list-counter" page="1" current="25" class="admin-lead-list-counter counter-block inline-box">
        <div class="flexbe-button filled rounded is-secondary">
          <div class="flexbe-text text-medium">25</div>
          <svg viewBox="0 0 10 6" class="flexbe-icon size-8">
            <path d="M5 4L9 -4.37114e-08L10 1L5 6L-4.37114e-08 1L1 -3.93402e-07L5 4Z"></path>
          </svg>
          <div data-is="dropdown" class="menu-list" position="center">
            <div class="toggle-helper"></div>
          </div>
        </div>
      </div> -->

      <div data-is="admin-lead-list-pagination" page="1" total="17" class="admin-lead-list-pagination pagination-block inline-box ml10">
        <div class="flexbe-button is-secondary filled rounded" disabled="disabled">
          <svg class="flexbe-icon size-10" viewBox="0 0 6 10">
            <path d="M2 5L6 1L5 0L0 5L5 10L6 9L2 5Z"></path>
          </svg>
        </div> <span class="flexbe-title caption"> 1 из 17 </span>
        <div class="flexbe-button is-secondary filled rounded">
          <svg class="flexbe-icon size-10" viewBox="0 0 6 10">
            <path d="M4 5L0 1L1 0L6 5L1 10L0 9L4 5Z"></path>
          </svg>
        </div>
      </div>


    </header>


    <section class="lead-list">

      <div class="lead-list--head">
        <div class="tr">
          <div class="th select">
            <label data-is="flexbe-input" type="checkbox" class="flexbe-input flexbe-input--checkbox  ">
              <input ref="input" class="flexbe-input__checkbox " type="checkbox"> <span class="flexbe-checkbox "></span> </label>
          </div>
          <div class="th th-center status" style="cursor: pointer" date-name="LeadStatus"> <span class="arrow-wrap"> Статус  </span> </div>
          <div class="th th-center customer" style="cursor: pointer" date-name="ClientName"> <span class="arrow-wrap"> Имя клиента  </span> </div>
          <div class="th th-center contact"> <span class="arrow-wrap"> Контакт  </span> </div>
          <div class="th th-center source"> <span class="arrow-wrap"> Форма / Страница  </span> </div>
          <div class="th th-center date" style="cursor: pointer" date-name="Date"> <span class="arrow-wrap"> Дата  </span> </div>
        </div>
      </div>


      <div class="lead-list--body">


        <?php foreach ($applications as $appl) : ?>

          <?php 
            // echo '<pre>'; print_r($appl); echo '</pre>'; 
          ?>

          <a tabindex="0" class="tr lead-item is-unread" href="/admin/lead/view/?id=<?=$appl['lead_id']?>"> 
            <span class="lead-bg unread first-unread"> </span> 
            <span class="td select"> 
              <label data-is="flexbe-input" type="checkbox" class="flexbe-input flexbe-input--checkbox lead-check contrast ">
                <input ref="input" class="flexbe-input__checkbox " type="checkbox">   <span class="flexbe-checkbox "></span> 
              </label> 
              <span class="lead-id"><?=$appl['lead_id']?></span> 
            </span> 
            <span class="td status">
              <!-- <div class="status" style="background-color: #<?= (isset($statuses[$appl['lead_status']]) ? $statuses[$appl['lead_status']]['status_color'] : 'FFB1B1') ?>;">
                  <select data-save_status="<?= $appl['lead_status'] ?>" data-id_page="<?= $appl['lead_id_page'] ?>" data-id_appl="<?= $appl['lead_id'] ?>">
                      <?php foreach ($statuses as $status) : ?>
                          <option <?= ($status['status_id'] == 0 ? 'disabled' : '') ?> data-color="<?= $status['status_color'] ?>" <?= ($status['status_id'] == $appl['lead_status'] ? 'selected' : '') ?> value="<?= $status['status_id'] ?>"><?= $status['status_name'] ?></option>
                      <?php endforeach; ?>
                  </select>
              </div> -->
              <?php 
                $appl['lead_status_text'] = false;
                foreach ($statuses as $status){
                  if($status['status_id'] == $appl['lead_status'])
                    $appl['lead_status_text'] = $status['status_name'];
                }
              ?>
              <span data-is="admin-lead-status-tag" editable="true" class="flexbe-tag admin-lead-list-status lead-status-tag code-<?=$appl['lead_status']?> clickable">
                <span class="flexbe-text"><?=$appl['lead_status_text']?></span>
                <svg class="flexbe-icon size-8 arrow-down" viewBox="0 0 8 5">
                  <path d="M4 3L7 0L8 1L4 5L0 1L1 0L4 3Z"></path>
                </svg>
                <dropdown position="center" ref="dropdown" autohide="true" append-to-body="true">
                  <div class="toggle-helper"></div>
                </dropdown>
              </span>
            </span> 
            <span class="td customer">
              <?=($appl['lead_name']?$appl['lead_name']:'-')?>
            </span> 
            <span class="td contact">
              <?=$appl['lead_phone']?>
            </span> 
            <span class="td source"> 
              <span class="mr20">Заявка</span> 
              <!-- <span class="text-shade-45 text-medium"> Франшиза по ремонту и отделке квартир - Ремонт 2.0 </span>  -->
            </span> 
            <span class="td date" title="<?=$appl['lead_date_view']?>"><?=$appl['lead_date_view']?></span> 
          </a>

        <?php endforeach; ?>

        <!-- <a tabindex="0" class="tr lead-item " href="/admin/lead/view/?id=32675099"> <span class="lead-bg"> </span> <span class="td select"> <label data-is="flexbe-input" type="checkbox" class="flexbe-input flexbe-input--checkbox lead-check contrast "><input ref="input" class="flexbe-input__checkbox " type="checkbox">   <span class="flexbe-checkbox "></span> </label> <span class="lead-id">403</span> </span> <span class="td status"> <span data-is="admin-lead-status-tag" editable="true" class="flexbe-tag admin-lead-list-status lead-status-tag code-0 clickable"><span class="flexbe-text">Новая</span>
          <svg class="flexbe-icon size-8 arrow-down" viewBox="0 0 8 5">
            <path d="M4 3L7 0L8 1L4 5L0 1L1 0L4 3Z"></path>
          </svg>
          <dropdown position="center" ref="dropdown" autohide="true" append-to-body="true">
            <div class="toggle-helper"></div>
          </dropdown>
          </span>
          </span> <span class="td customer">Дмитрий</span> <span class="td contact">+7 (991) 2545312</span> <span class="td source"> <span class="mr20">Заявка / Инд.предложение</span> <span class="text-shade-45 text-medium"> Франшиза по ремонту и отделке квартир - Ремонт 2.0 </span> </span> <span class="td date" title="31.01.2023 17:56">31.01.2023</span> </a>

        <a tabindex="0" class="tr lead-item is-unread" href="/admin/lead/view/?id=32674704"> <span class="lead-bg unread first-unread"> </span> <span class="td select"> <label data-is="flexbe-input" type="checkbox" class="flexbe-input flexbe-input--checkbox lead-check contrast "><input ref="input" class="flexbe-input__checkbox " type="checkbox">   <span class="flexbe-checkbox "></span> </label> <span class="lead-id">402</span> </span> <span class="td status"> <span data-is="admin-lead-status-tag" editable="true" class="flexbe-tag admin-lead-list-status lead-status-tag code-0 clickable"><span class="flexbe-text">Новая</span>
          <svg class="flexbe-icon size-8 arrow-down" viewBox="0 0 8 5">
            <path d="M4 3L7 0L8 1L4 5L0 1L1 0L4 3Z"></path>
          </svg>
          <dropdown position="center" ref="dropdown" autohide="true" append-to-body="true">
            <div class="toggle-helper"></div>
          </dropdown>
          </span>
          </span> <span class="td customer">Игорь</span> <span class="td contact">+7 (999) 9041572</span> <span class="td source"> <span class="mr20">Заявка / Инд.предложение</span> <span class="text-shade-45 text-medium"> Франшиза по ремонту и отделке квартир - Ремонт 2.0 </span> </span> <span class="td date" title="31.01.2023 17:36">31.01.2023</span> </a>

        <a tabindex="0" class="tr lead-item is-unread" href="/admin/lead/view/?id=32674542"> <span class="lead-bg unread"> </span> <span class="td select"> <label data-is="flexbe-input" type="checkbox" class="flexbe-input flexbe-input--checkbox lead-check contrast "><input ref="input" class="flexbe-input__checkbox " type="checkbox">   <span class="flexbe-checkbox "></span> </label> <span class="lead-id">401</span> </span> <span class="td status"> <span data-is="admin-lead-status-tag" editable="true" class="flexbe-tag admin-lead-list-status lead-status-tag code-0 clickable"><span class="flexbe-text">Новая</span>
          <svg class="flexbe-icon size-8 arrow-down" viewBox="0 0 8 5">
            <path d="M4 3L7 0L8 1L4 5L0 1L1 0L4 3Z"></path>
          </svg>
          <dropdown position="center" ref="dropdown" autohide="true" append-to-body="true">
            <div class="toggle-helper"></div>
          </dropdown>
          </span>
          </span> <span class="td customer">Максим</span> <span class="td contact">+7 (916) 9078930</span> <span class="td source"> <span class="mr20">Заявка / Инд.предложение</span> <span class="text-shade-45 text-medium"> Франшиза по ремонту и отделке квартир - Ремонт 2.0 </span> </span> <span class="td date" title="31.01.2023 17:28">31.01.2023</span> </a> -->


      <div class="lead-list--footer">
        <div data-is="admin-lead-list-pagination" page="1" total="17" class="admin-lead-list-pagination pagination-block inline-box">
          <div class="flexbe-button is-secondary filled rounded" disabled="disabled">
            <svg class="flexbe-icon size-10" viewBox="0 0 6 10">
              <path d="M2 5L6 1L5 0L0 5L5 10L6 9L2 5Z"></path>
            </svg>
          </div> <span class="flexbe-title caption"> 1 из 17 </span>
          <div class="flexbe-button is-secondary filled rounded">
            <svg class="flexbe-icon size-10" viewBox="0 0 6 10">
              <path d="M4 5L0 1L1 0L6 5L1 10L0 9L4 5Z"></path>
            </svg>
          </div>
        </div>
      </div>

    </section>


    <footer data-is="admin-lead-list-actionbar" sprite="/<?=VERSION?>/admin/resources/images/lead.svg?af9bc055" class="admin-lead-list-actionbar  ">
      <div class="actions-button"> <span class="flexbe-text">Выберите действие</span>
        <svg class="flexbe-icon size-10">
          <use xlink:href="/<?=VERSION?>/admin/resources/images/lead.svg?af9bc055#select"></use>
        </svg>
        <dropdown position="center" direction="top" autohide="true">
          <div class="toggle-helper"></div>
        </dropdown>
      </div>
      <div class="flexbe-button large rounded is-primary"> <span class="flexbe-text">Закрыть</span> </div>
    </footer>
  </div>
</div>