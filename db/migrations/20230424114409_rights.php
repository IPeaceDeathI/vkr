<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Rights extends AbstractMigration
{
    public string $name = 'rights';

    public function up(): void
    {
        return;
        if ($this->hasTable($this->name)) return;

        $sql = 'CREATE TABLE `rights` (
            `right_id` int unsigned NOT NULL AUTO_INCREMENT,
            `right_project` varchar(32) DEFAULT NULL,
            `right_uid` int NOT NULL,
            `right_account` int NOT NULL,
            `right_role` varchar(32) DEFAULT NULL,
            `right_group` varchar(32) DEFAULT "all",
            `right_author` int DEFAULT NULL,
            `right_parent` int DEFAULT NULL,
            `right_status` varchar(32) NOT NULL DEFAULT "active",
            `right_phone` varchar(96) DEFAULT NULL,
            `right_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `right_date_edit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`right_id`),
            UNIQUE KEY `rights_uniq` (`right_uid`,`right_account`,`right_role`,`right_group`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ';

        $this->execute($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
