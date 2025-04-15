<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class Users extends NoksMigration
{
    public string $name = 'users';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['user_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['user_email'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        // $sql = 'CREATE TABLE `users` (
        //     `user_id` int unsigned NOT NULL AUTO_INCREMENT,
        //     `user_mid` int NOT NULL DEFAULT "0",
        //     `user_sip` mediumint NOT NULL DEFAULT "0",
        //     `user_manager_status` tinyint NOT NULL DEFAULT "0",
        //     `user_admin` int DEFAULT "0",
        //     `user_api_secret` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_tlgrm` varchar(48) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_tlgrm_id` bigint DEFAULT NULL,
        //     `user_login` varchar(24) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_phone` varchar(24) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_email` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_password` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_hash` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT "",
        //     `user_ip` varchar(24) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_date_register` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        //     `user_date_last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        //     `user_photo` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_fio` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_ref_invite` varchar(24) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_ref_code` varchar(24) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_ref_visits` int NOT NULL DEFAULT "0",
        //     `user_ref_card` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_focus_command` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        //     `user_zadarma_key` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT "",
        //     `user_zadarma_secret` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT "",
        //     PRIMARY KEY (`user_id`),
        //     UNIQUE KEY `user_email` (`user_email`)
        //   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci';


        $this->setColumn('user_id', 'integer', [
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('user_mid', 'integer', [
            'null' => false,
            'default' => '0',
        ]);
        $this->setColumn('user_sip', 'mediumint', [
            'null' => false,
            'default' => '0',
        ]);
        $this->setColumn('user_manager_status', 'tinyint', [
            'null' => false,
            'default' => '0',
        ]);
        $this->setColumn('user_admin', 'int', [
            'default' => '0',
        ]);
        $this->setColumn('user_api_secret', 'string', [
            'limit' => 32,
        ]);
        $this->setColumn('user_tlgrm', 'string', [
            'limit' => 48,
        ]);
        $this->setColumn('user_tlgrm_id', 'bigint', []);
        $this->setColumn('user_login', 'string', [
            'limit' => 24,
        ]);
        $this->setColumn('user_phone', 'string', [
            'limit' => 24,
        ]);
        $this->setColumn('user_email', 'string', [
            'null' => false,
            'limit' => 64,
        ]);
        // $this->setColumn('user_num_code_email', 'bigint', [
        //     'null' => false,
        //     'signed' => false,
        //     'comment' => 'числовое представление email',
        // ]);
        $this->setColumn('user_password', 'string', [
            'limit' => 32,
        ]);
        $this->setColumn('user_ya_client_id', 'string', [
            'limit' => 32,
        ]);
        $this->setColumn('user_hash', 'string', [
            'limit' => 32,
            'null' => false,
            'default' => '',
        ]);
        $this->setColumn('user_ip', 'string', [
            'limit' => 24,
        ]);
        $this->setColumn('user_date_register', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('user_updated_at', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
            'update' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('user_date_last_login', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('user_photo', 'string', [
            'limit' => 128,
        ]);
        $this->setColumn('user_fio', 'string', [
            'limit' => 64,
        ]);
        $this->setColumn('user_ref_invite', 'string', [
            'limit' => 24,
        ]);
        // $this->setColumn('user_ref_code', 'string', [
        //     'limit' => 24,
        // ]);
        // $this->setColumn('user_ref_visits', 'integer', [
        //     'null' => false,
        //     'default' => '0',
        // ]);
        // $this->setColumn('user_ref_card', 'string', [
        //     'limit' => 64,
        // ]);
        $this->setColumn('user_focus_command', 'string', [
            'limit' => 40,
        ]);
        $this->setColumn('user_zadarma_key', 'string', [
            'null' => false,
            'limit' => 64,
            'default' => '',
        ]);
        $this->setColumn('user_zadarma_secret', 'string', [
            'null' => false,
            'limit' => 64,
            'default' => '',
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

        // дефолтный пользователь
        $sql = 'INSERT INTO users SET user_id=1, user_admin=1, user_email="admin@admin.ru", user_password="c3284d0f94606de1fd2af172aba15bf3"';

        $this->execute($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}



// старый код
// $sql = 'CREATE TABLE `users` (
//     `user_id` int unsigned NOT NULL AUTO_INCREMENT,
//     `user_mid` int NOT NULL DEFAULT "0",
//     `user_sip` mediumint NOT NULL DEFAULT "0",
//     `user_manager_status` tinyint NOT NULL DEFAULT "0",
//     `user_admin` int DEFAULT "0",
//     `user_api_secret` varchar(32) DEFAULT NULL,
//     `user_tlgrm` varchar(48) DEFAULT NULL,
//     `user_tlgrm_id` bigint DEFAULT NULL,
//     `user_login` varchar(24) DEFAULT NULL,
//     `user_phone` varchar(24) DEFAULT NULL,
//     `user_email` varchar(64) DEFAULT NULL UNIQUE,
//     `user_password` varchar(32) DEFAULT NULL,
//     `user_hash` varchar(32) NOT NULL DEFAULT "",
//     `user_ip` varchar(24) DEFAULT NULL,
//     `user_date_register` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     `user_date_last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     `user_photo` varchar(128) DEFAULT NULL,
//     `user_fio` varchar(64) DEFAULT NULL,
//     `user_ref_invite` varchar(24) DEFAULT NULL,
//     `user_ref_code` varchar(24) DEFAULT NULL,
//     `user_ref_visits` int NOT NULL DEFAULT "0",
//     `user_ref_card` varchar(64) DEFAULT NULL,
//     `user_focus_command` varchar(40) DEFAULT NULL,
//     `user_zadarma_key` varchar(64) NOT NULL DEFAULT "",
//     `user_zadarma_secret` varchar(64) NOT NULL DEFAULT "",
//     PRIMARY KEY (`user_id`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;';