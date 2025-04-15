<template>

<div class="admin-content-wrapper scrollable-content" id="app">
  <div data-is="admin-lead-list" class="admin-content admin-lead-list container fluid fade-in-animation ">
    <header>
      <div class="flexbe-title text-title"> Заявки </div>


      <!-- <div data-is="proxy" is="admin-lead-list-filters" sprite="@/assets/images/lead.svg?af9bc055" style="" class="admin-lead-list-filters ">
        <div class="flexbe-button is-secondary filled rounded">
          <svg is="flexbe-icon" icon="filter-lead" sprite="@/assets/images/lead.svg?af9bc055" class="flexbe-icon size-16 ">
            <use href="@/assets/images/lead.svg?af9bc055#filter-lead"></use>
          </svg><span class="flexbe-text text-medium">Фильтр</span>
          <div is="proxy" data-is="dropdown">
            <div class="toggle-helper"></div>
          </div>
        </div>
      </div> -->

      <!-- <div data-is="proxy" is="admin-lead-list-export" sprite="@/assets/images/lead.svg?af9bc055" style="" class="admin-lead-list-export ">
        <div class="flexbe-button filled is-secondary rounded tooltipstered" data-tip="Экспорт заявок">
          <svg is="flexbe-icon" class="flexbe-icon size-16 m0" size="16" icon="file-download" sprite="@/assets/images/lead.svg?af9bc055">
            <use href="@/assets/images/lead.svg?af9bc055#file-download"></use>
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


        <a tabindex="0" class="tr lead-item " href="/admin/lead/view/32675099"> <span class="lead-bg"> </span> <span class="td select"> <label data-is="flexbe-input" type="checkbox" class="flexbe-input flexbe-input--checkbox lead-check contrast "><input ref="input" class="flexbe-input__checkbox " type="checkbox">   <span class="flexbe-checkbox "></span> </label> <span class="lead-id">403</span> </span> <span class="td status"> <span data-is="admin-lead-status-tag" editable="true" class="flexbe-tag admin-lead-list-status lead-status-tag code-0 clickable"><span class="flexbe-text">Новая</span>
          <svg class="flexbe-icon size-8 arrow-down" viewBox="0 0 8 5">
            <path d="M4 3L7 0L8 1L4 5L0 1L1 0L4 3Z"></path>
          </svg>
          <dropdown position="center" ref="dropdown" autohide="true" append-to-body="true">
            <div class="toggle-helper"></div>
          </dropdown>
          </span>
          </span> <span class="td customer">Дмитрий</span> <span class="td contact">+7 (991) 2545312</span> <span class="td source"> <span class="mr20">Заявка / Инд.предложение</span> <span class="text-shade-45 text-medium"> Франшиза по ремонту и отделке квартир - Ремонт 2.0 </span> </span> <span class="td date" title="31.01.2023 17:56">31.01.2023</span> </a>

        <a tabindex="0" class="tr lead-item is-unread" href="/admin/lead/view/32674704"> <span class="lead-bg unread first-unread"> </span> <span class="td select"> <label data-is="flexbe-input" type="checkbox" class="flexbe-input flexbe-input--checkbox lead-check contrast "><input ref="input" class="flexbe-input__checkbox " type="checkbox">   <span class="flexbe-checkbox "></span> </label> <span class="lead-id">402</span> </span> <span class="td status"> <span data-is="admin-lead-status-tag" editable="true" class="flexbe-tag admin-lead-list-status lead-status-tag code-0 clickable"><span class="flexbe-text">Новая</span>
          <svg class="flexbe-icon size-8 arrow-down" viewBox="0 0 8 5">
            <path d="M4 3L7 0L8 1L4 5L0 1L1 0L4 3Z"></path>
          </svg>
          <dropdown position="center" ref="dropdown" autohide="true" append-to-body="true">
            <div class="toggle-helper"></div>
          </dropdown>
          </span>
          </span> <span class="td customer">Игорь</span> <span class="td contact">+7 (999) 9041572</span> <span class="td source"> <span class="mr20">Заявка / Инд.предложение</span> <span class="text-shade-45 text-medium"> Франшиза по ремонту и отделке квартир - Ремонт 2.0 </span> </span> <span class="td date" title="31.01.2023 17:36">31.01.2023</span> </a>

        <a tabindex="0" class="tr lead-item is-unread" href="/admin/lead/view/32674542"> <span class="lead-bg unread"> </span> <span class="td select"> <label data-is="flexbe-input" type="checkbox" class="flexbe-input flexbe-input--checkbox lead-check contrast "><input ref="input" class="flexbe-input__checkbox " type="checkbox">   <span class="flexbe-checkbox "></span> </label> <span class="lead-id">401</span> </span> <span class="td status"> <span data-is="admin-lead-status-tag" editable="true" class="flexbe-tag admin-lead-list-status lead-status-tag code-0 clickable"><span class="flexbe-text">Новая</span>
          <svg class="flexbe-icon size-8 arrow-down" viewBox="0 0 8 5">
            <path d="M4 3L7 0L8 1L4 5L0 1L1 0L4 3Z"></path>
          </svg>
          <dropdown position="center" ref="dropdown" autohide="true" append-to-body="true">
            <div class="toggle-helper"></div>
          </dropdown>
          </span>
          </span> <span class="td customer">Максим</span> <span class="td contact">+7 (916) 9078930</span> <span class="td source"> <span class="mr20">Заявка / Инд.предложение</span> <span class="text-shade-45 text-medium"> Франшиза по ремонту и отделке квартир - Ремонт 2.0 </span> </span> <span class="td date" title="31.01.2023 17:28">31.01.2023</span> </a>

      </div>

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


    <footer data-is="admin-lead-list-actionbar" sprite="@/assets/images/lead.svg?af9bc055" class="admin-lead-list-actionbar  ">
      <div class="actions-button"> <span class="flexbe-text">Выберите действие</span>
        <svg class="flexbe-icon size-10">
          <use xlink:href="@/assets/images/lead.svg?af9bc055#select"></use>
        </svg>
        <dropdown position="center" direction="top" autohide="true">
          <div class="toggle-helper"></div>
        </dropdown>
      </div>
      <div class="flexbe-button large rounded is-primary"> <span class="flexbe-text">Закрыть</span> </div>
    </footer>
  </div>
</div>

</template>