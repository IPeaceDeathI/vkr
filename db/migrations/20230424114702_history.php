<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class History extends AbstractMigration
{
    public string $name = 'history';

    public function up (): void
    {
        if($this->hasTable($this->name)) return;

        $sql = 'CREATE TABLE `history` (
            `history_id` int unsigned NOT NULL AUTO_INCREMENT,
            `history_flow` varchar(32) DEFAULT NULL,
            `history_uid` int NOT NULL,
            `history_text` text,
            `history_result` text,
            `history_smeta_id` int DEFAULT NULL,
            `history_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `history_date_edit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`history_id`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ';

        $this->execute($sql);
    }

    public function down (): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
