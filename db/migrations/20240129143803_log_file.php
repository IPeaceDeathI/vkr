<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

// CREATE TABLE logs (
//     log_hash           TEXT PRIMARY KEY ON CONFLICT IGNORE
//                             NOT NULL,
//     log_name_file      TEXT NOT NULL,
//     log_json           TEXT NOT NULL,
//     log_datetime_paste TEXT DEFAULT (datetime('now') ) 
//                             NOT NULL
// );


final class LogFile extends NoksMigration
{
    public string $name = 'log_file';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['log_hash'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        // [
        //     'columns' => [],
        //     'options' => [],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('log_hash', 'varchar', [
            'null' => false,
        ]);
        $this->setColumn('log_name_file', 'varchar', [
            'null'  => false,
            'limit' => 4096,
        ]);
        $this->setColumn('log_json', 'longtext', [
            'null' => false,
        ]);
        $this->setColumn('comment', 'varchar', []);
        $this->createdAt('log_datetime_paste');


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
        // $this->table($this->name)->drop()->save();
    }
}
