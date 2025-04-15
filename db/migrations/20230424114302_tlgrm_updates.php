<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class TlgrmUpdates extends NoksMigration
{
    public string $name = 'tlgrm_updates';

    public array $settingTable = [
        'id' => false,
        'primary_key' => ['update_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        // [
        //     'columns' => [''],
        //     'options' => [],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('update_id', 'bigint', [
            'null' => false,
            'signed' => false,
            'identity' => true,
        ]);
        $this->setColumn('update_tid', 'bigint', []);
        $this->setColumn('update_token', 'varchar', [
            'limit' => 64,
        ]);
        $this->setColumn('update_type', 'varchar', [
            'limit' => 32,
        ]);
        $this->setColumn('update_data', 'text', []);
        $this->setColumn('update_lead_id', 'int', []);
        $this->setColumn('update_user_id', 'bigint', []);
        $this->setColumn('update_from_username', 'varchar', [
            'limit' => 48,
        ]);
        $this->setColumn('update_message_id', 'bigint', []);
        $this->setColumn('update_message_from_id', 'bigint', []);
        $this->setColumn('update_message_from_username', 'varchar', [
            'limit' => 48,
        ]);
        $this->setColumn('update_message_chat_id', 'bigint', []);
        $this->setColumn('update_message_chat_username', 'varchar', [
            'limit' => 48,
        ]);
        $this->setColumn('update_message_text', 'text', []);
        $this->setColumn('update_message_photos', 'text', []);
        $this->setColumn('update_message_photo', 'text', []);
        $this->setColumn('update_message_audio', 'varchar', [
            'limit' => 512,
        ]);
        $this->setColumn('update_message_document', 'varchar', [
            'limit' => 512,
        ]);
        $this->setColumn('update_reply_id', 'bigint', []);
        $this->setColumn('update_reply_from_username', 'varchar', [
            'limit' => 48,
        ]);
        $this->setColumn('update_reply_chat_username', 'varchar', [
            'limit' => 48,
        ]);
        $this->setColumn('update_reply_text', 'text', []);
        $this->setColumn('update_result', 'text', []);
        $this->setColumn('update_date', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
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


// $sql = 'CREATE TABLE `tlgrm_updates` (
//     `update_id` int unsigned NOT NULL AUTO_INCREMENT,
//     `update_tid` bigint DEFAULT NULL,
//     `update_token` varchar(64) DEFAULT NULL,
//     `update_type` varchar(32) DEFAULT NULL,
//     `update_data` text,
//     `update_lead_id` int DEFAULT NULL,
//     `update_user_id` bigint DEFAULT NULL,
//     `update_from_username` varchar(48) DEFAULT NULL,
//     `update_message_id` bigint DEFAULT NULL,
//     `update_message_from_id` bigint DEFAULT NULL,
//     `update_message_from_username` varchar(48) DEFAULT NULL,
//     `update_message_chat_id` bigint DEFAULT NULL,
//     `update_message_chat_username` varchar(48) DEFAULT NULL,
//     `update_message_text` text,
//     `update_message_photos` text,
//     `update_message_photo` text,
//     `update_message_audio` varchar(512) DEFAULT NULL,
//     `update_message_document` varchar(512) DEFAULT NULL,
//     `update_reply_id` bigint DEFAULT NULL,
//     `update_reply_from_username` varchar(48) DEFAULT NULL,
//     `update_reply_chat_username` varchar(48) DEFAULT NULL,
//     `update_reply_text` text,
//     `update_result` text,
//     `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (`update_id`)
//     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
// ';