
-- Добавляем блоки в прод

INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);
INSERT INTO `constructor_blocks` (`block_id`, `block_name`, `block_structure`, `block_preview_src`, `creator_id`) VALUES (NULL, NULL, NULL, NULL, NULL);


INSERT INTO `constructor_block_categories` (`category_id`, `category_name`) VALUES (NULL, 'Основные');


ALTER TABLE `constructor_block_links` ADD COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT FIRST;
ALTER TABLE `noks_local`.`constructor_block_links` ADD UNIQUE (`block_id`, `category_id`);

INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (1, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (2, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (3, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (4, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (5, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (6, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (7, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (8, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (9, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (10, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (11, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (12, 1);
INSERT INTO `constructor_block_links` (`block_id`, `category_id`) VALUES (13, 1);


-- Если команды 

UPDATE `flows` SET flow_hash='hash40' WHERE flow_id=1;


-- Уникальный домен фикс

ALTER TABLE `sites_domain` DROP INDEX `domain`, ADD UNIQUE `domain` (`domain`) USING BTREE;


-- 2023-05-01 / Чтобы начал изменять и авторы создавали

UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 1;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 2;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 3;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 4;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 5;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 6;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 7;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 8;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 9;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 10;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 11;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 12;
UPDATE `constructor_blocks` SET `creator_id` = '1' WHERE `constructor_blocks`.`block_id` = 13;


-- Категории блоков

INSERT INTO `constructor_block_categories` (`category_id`, `category_name`) VALUES
(1, 'Обложка'),
(2, 'О проекте'),
(3, 'Заголовок'),
(4, 'Текстовый блок'),
(5, 'Изображение'),
(6, 'Галерея'),
(7, 'Форма'),
(8, 'Кнопка'),
(9, 'Преимущества'),
(10, 'Колонки'),
(11, 'Меню'),
(12, 'Магазин'),
(13, 'Разделитель'),
(14, 'Список страниц'),
(15, 'Подвал'),
(16, 'Видео'),
(17, 'Команда'),
(18, 'Отзывы'),
(19, 'Расписание'),
(20, 'Этапы'),
(21, 'Контакты'),
(22, 'Услуги'),
(23, 'Соц. сети'),
(24, 'Тарифы'),
(25, 'Партнеры'),
(26, 'Списки'),
(99, 'Другое');

-- 

ALTER TABLE `users` CHANGE `user_admin` `user_admin` INT(11) NULL DEFAULT '0';

ALTER TABLE `users` CHANGE `user_focus_command` `user_focus_command` VARCHAR(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

ALTER TABLE `finances` CHANGE `finance_shp_item` `finance_shp_product` INT(11) NULL DEFAULT NULL;

ALTER TABLE `users`
DROP `user_pay_finish`,
DROP `user_pay_shp_item`,
DROP `user_pay_shp_name`;

ALTER TABLE `finances` ADD `finance_id_flow` INT NULL DEFAULT NULL AFTER `finance_date_edit`;

ALTER TABLE `finances` DROP `finance_shp_finish`;

ALTER TABLE `finances` CHANGE `finance_user_data` `finance_user_data` VARCHAR(16) DEFAULT NULL;
ALTER TABLE `finances` CHANGE `finance_ref_invite` `finance_ref_invite` VARCHAR(24) DEFAULT NULL;


-- 2023-05-18

ALTER TABLE `flows` ADD `flow_balance` int unsigned NOT NULL DEFAULT "0";
ALTER TABLE `flows` ADD `flow_tariff_id` int unsigned NULL AFTER `flow_balance`;

ALTER TABLE quiz ADD COLUMN `quiz_views` int unsigned DEFAULT 0;

ALTER TABLE `finances`
DROP `finance_inv_id`,
DROP `finance_shp_count`,
DROP `finance_user_data`;



-- 2023-05-29 -----------------------------------------

START TRANSACTION;


CREATE TABLE `constructor_favourites_blocks` (
  `user_id` int unsigned NOT NULL,
  `block_id` int unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`block_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--

-- --------------------------------------------------------

--
-- Структура таблицы `entity_rights_links`
--

CREATE TABLE `entity_rights_links` (
  `id_entity` int UNSIGNED NOT NULL,
  `id_option` int UNSIGNED NOT NULL,
  `entity_type` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `logs_balance`
--

CREATE TABLE `logs_balance` (
  `log_id` int UNSIGNED NOT NULL,
  `log_id_flow` int UNSIGNED NOT NULL,
  `log_action` tinyint UNSIGNED NOT NULL,
  `log_value` float(8,2) UNSIGNED NOT NULL,
  `log_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `tariff`
--

CREATE TABLE `tariff` (
  `tariff_flow_id` int UNSIGNED NOT NULL,
  `tariff_id` int UNSIGNED DEFAULT NULL,
  `tariff_status` int UNSIGNED DEFAULT NULL,
  `tariff_activation` timestamp NULL DEFAULT NULL,
  `tariff_blocking` timestamp NULL DEFAULT NULL,
  `tariff_last_write_off` timestamp NULL DEFAULT NULL,
  `tariff_trial_start` timestamp NULL DEFAULT NULL,
  `tariff_trial_end` timestamp NULL DEFAULT NULL,
  `tariff_trial_fully_used` tinyint UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `entity_rights_links`
--
ALTER TABLE `entity_rights_links`
  ADD UNIQUE KEY `id_user` (`id_entity`,`id_option`,`entity_type`);

--
-- Индексы таблицы `logs_balance`
--
ALTER TABLE `logs_balance`
  ADD PRIMARY KEY (`log_id`);

--
-- Индексы таблицы `tariff`
--
ALTER TABLE `tariff`
  ADD UNIQUE KEY `tariff_flow_id` (`tariff_flow_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `logs_balance`
--
ALTER TABLE `logs_balance`
  MODIFY `log_id` int UNSIGNED NOT NULL AUTO_INCREMENT;


ALTER TABLE `constructor_block_categories`
  ADD COLUMN category_position int DEFAULT NULL;

COMMIT;


--

ALTER TABLE `pages_hash` CHANGE `hash_text` `hash_text` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

ALTER TABLE `constructor_templates` CHANGE `tpl_blocks_structure` `tpl_blocks_structure` LONGTEXT NULL DEFAULT NULL;
ALTER TABLE `constructor_templates` CHANGE `tpl_html` `tpl_html` LONGTEXT NULL DEFAULT NULL;

-- 

crontab -e 

5 * * * * php var/www/noks/cron/clearImgQuiz.php run
5 * * * * php var/www/noks/cron/ControleTariff.php run
5 * * * * php var/www/noks/cron/controleTrial.php run

--

ALTER TABLE `finances` ADD `finance_show_order_id` INT UNSIGNED NOT NULL AFTER `finance_id`;


-- crm_leads
ALTER TABLE crm_leads ADD COLUMN `lead_id_flow` int unsigned NOT NULL AFTER lead_id;
ALTER TABLE crm_leads ADD COLUMN `lead_source_entity` int unsigned NOT NULL AFTER lead_id_flow;
ALTER TABLE crm_leads ADD COLUMN `lead_id_entity` int unsigned NOT NULL AFTER lead_source_entity;
ALTER TABLE crm_leads ADD COLUMN `lead_id_page` int unsigned DEFAULT NULL AFTER lead_id_entity;
ALTER TABLE crm_leads ADD COLUMN `lead_id_site` int unsigned DEFAULT NULL AFTER lead_id_page;


ALTER TABLE `sites` ADD `code_head` TEXT NULL DEFAULT NULL AFTER `status`, ADD `code_body` TEXT NULL DEFAULT NULL AFTER `code_head`;
ALTER TABLE `pages_hash` DROP `hash_date_edit`;
ALTER TABLE `crm_leads` DROP `lead_order_page`;


-- 

ALTER TABLE crm_leads AUTO_INCREMENT=154326;
ALTER TABLE sites AUTO_INCREMENT=15934;
ALTER TABLE users AUTO_INCREMENT=1574;
ALTER TABLE form AUTO_INCREMENT=8412;
ALTER TABLE pages_hash AUTO_INCREMENT=24305;
ALTER TABLE sites_pages AUTO_INCREMENT=13623;
