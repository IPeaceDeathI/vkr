<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Flows extends AbstractMigration
{
    public string $name = 'flows';

    public function up(): void
    {
        if ($this->hasTable($this->name)) return;

        $sql = 'CREATE TABLE `flows` (
            `flow_id` int unsigned NOT NULL AUTO_INCREMENT,
            `flow_balance` float(8,2) unsigned NOT NULL DEFAULT "0",
            -- `flow_tariff_id` int unsigned NOT NULL,
            -- `flow_turn_tariff` timestamp DEFAULT NULL,
            -- `flow_count_write_offs` int unsigned NOT NULL DEFAULT "0",
            `flow_type` varchar(24) NOT NULL DEFAULT "command",
            `flow_private` varchar(32) NOT NULL DEFAULT "hide",
            `flow_archive` tinyint DEFAULT "0",
            `flow_uid` int DEFAULT NULL,
            `flow_hash` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            `flow_ref` varchar(24) DEFAULT NULL,
            `flow_name` text,
            `flow_logo` varchar(512) DEFAULT NULL,
            `flow_styles` text,
            `flow_api_key` varchar(64) DEFAULT NULL,
            `flow_api_date` timestamp NULL DEFAULT NULL,
            `flow_api_rid` varchar(32) DEFAULT "0",
            `flow_api_rr_dt` varchar(32) DEFAULT NULL,
            `flow_zadarma_key` varchar(64) DEFAULT NULL,
            `flow_zadarma_secret` varchar(64) DEFAULT NULL,
            `flow_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `flow_date_edit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`flow_id`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ';

        $this->execute($sql);

        // дефолтный связь пользователя
        $sql = 'INSERT INTO flows SET flow_uid = 1, flow_name = "Первый проект", flow_hash = "356a192b7913b04c54574d18c28d46e6395428ab"';
        $this->execute($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
