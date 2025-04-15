<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\FinanceModel
 */
final class Finances extends NoksMigration
{
    public string $name = 'finances';

    public array $settingTable = [
        'id' => false,
        'primary_key' => ['finance_id'],
        'encoding' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ];

    public function up(): void
    {
        $this->setColumn('finance_id', 'int', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('finance_show_order_id', 'int', [
            'null' => false,
            'signed' => false,
        ]);
        // TODO заменить на идентификаторы енамов
        $this->setColumn('finance_status', 'varchar', [
            'limit' => 24,
        ]);
        $this->setColumn('finance_uid', 'int', []);
        $this->setColumn('finance_id_flow', 'int', []);
        $this->setColumn('finance_sum', 'int', []);
        $this->setColumn('finance_sum_bonus', 'int', [
            'null'    => false,
            'signed'  => false,
            'default' => 0,
        ]);
        $this->setColumn('finance_payment_method', 'varchar', [
            'limit' => 24,
        ]);
        $this->setColumn('finance_curr_label', 'varchar', [
            'limit' => 24,
        ]);
        $this->setColumn('finance_email', 'varchar', [
            'limit' => 255,
        ]);
        $this->setColumn('finance_fee', 'float', [
            'precision' => 8,
            'scale' => 2,
        ]);
        $this->setColumn('finance_shp_product', 'int', []);
        // $this->setColumn('finance_ref_invite_code', 'varchar', [
        //     'limit' => 10,
        // ]);
        // $this->setColumn('finance_ref_invite_user_id', 'int', [
        //     'signed' => false,
        // ]);
        $this->setColumn('finance_is_test', 'int', []);
        $this->setColumn('finance_date', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('finance_date_edit', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
            'update' => 'CURRENT_TIMESTAMP'
        ]);

        if ($this->hasTable($this->name)) {
            $this->updateTable();
            $this->removeUnnecessaryColumns();
            $this->addIndicesTable();
            return;
        }

        $this->createTable();
        $this->updateTable();
        $this->addIndicesTable();
    }

    public function down(): void
    {
        //$this->table($this->name)->drop()->save();
    }
}


// $sql = 'CREATE TABLE `finances` (
//             -- `finance_id` int unsigned NOT NULL AUTO_INCREMENT,
//             -- `finance_show_order_id` int unsigned NOT NULL,
//             -- `finance_status` varchar(24) DEFAULT NULL,
//             -- `finance_uid` int DEFAULT NULL,
//             -- `finance_id_flow` int DEFAULT NULL,
//             -- `finance_sum` int DEFAULT NULL,
//             -- `finance_payment_method` varchar(24) DEFAULT NULL,
//             -- `finance_curr_label` varchar(24) DEFAULT NULL,
//             -- `finance_email` varchar(255) DEFAULT NULL,
//             -- `finance_fee` float(8,2) DEFAULT NULL,
//             -- `finance_shp_product` int DEFAULT NULL,
//             -- `finance_shp_count` int NOT NULL DEFAULT "0",
//             -- `finance_user_data` varchar(16) DEFAULT NULL,
//             -- `finance_ref_invite` varchar(24) DEFAULT NULL,
//             -- `finance_is_test` int DEFAULT NULL,
//             `finance_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//             `finance_date_edit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//             PRIMARY KEY (`finance_id`)
//           ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
//         ';