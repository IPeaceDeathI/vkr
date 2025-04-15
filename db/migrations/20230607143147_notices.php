<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\NoticeMethodEnum;
use Noks\Enum\StatusNoticeEnum;

final class Notices extends NoksMigration
{
    public string $name = 'notices';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['notice_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        // [
        //     'columns' => [],
        //     'options' => [
        //         'unique' => true,
        //     ],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('notice_id', 'int', [
            'signed' => false,
            'identity' => true,
        ]);
        $this->setColumn('notice_where_entity_id', 'int', [
            'signed' => false,
        ]);
        $this->setColumn('notice_where_entity_type', 'int', [
            'signed' => false,
            'comment' => EntityTypeEnum::class,
        ]);
        $this->setColumn('notice_what_entity_id', 'int', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('notice_what_entity_type', 'int', [
            'null' => false,
            'signed' => false,
            'comment' => EntityTypeEnum::class,
        ]);
        $this->setColumn('notice_method_send', 'int', [
            'signed' => false,
            'comment' => NoticeMethodEnum::class,
        ]);
        $this->setColumn('notice_status', 'int', [
            'null' => false,
            'signed' => false,
            'comment' => StatusNoticeEnum::class,
        ]);

        $this->setColumn('notice_text', 'text', [
            'comment' => 'отправленное сообщение',
        ]);
        $this->setColumn('notice_result', 'text', [
            'comment' => 'результат',
        ]);

        $this->setColumn('notice_date', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('notice_date_edit', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
            'update' => 'CURRENT_TIMESTAMP',
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
        #$this->table($this->name)->drop()->save();
    }
}

// $sql = 'CREATE TABLE `notices` (
//     `notice_id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     `notice_where_entity_id` int UNSIGNED DEFAULT NULL,
//     `notice_where_entity_type` int UNSIGNED DEFAULT NULL,
//     `notice_what_entity_id` int UNSIGNED NOT NULL,
//     `notice_what_entity_type` int UNSIGNED NOT NULL,
//     -- `notice_uid` int UNSIGNED DEFAULT NULL,
//     -- `notice_hash` varchar(96) DEFAULT NULL,
//     `notice_type` int UNSIGNED,-- telegram / email : Enum "notice_method_send"
//     `notice_status` int UNSIGNED NOT NULL,-- create / send : Enum
//     `notice_url` varchar(256) DEFAULT NULL,
//     `notice_text` text DEFAULT NULL,
//     `notice_result` text DEFAULT NULL,
//     `notice_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     `notice_date_edit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     ) ENGINE=innodb;
// ';