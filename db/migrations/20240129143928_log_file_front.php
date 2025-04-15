<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

// CREATE TABLE front_logs (
//     log_hash           TEXT    PRIMARY KEY ON CONFLICT IGNORE
//                                NOT NULL,
//     log_json           TEXT    NOT NULL,
//     status             NUMERIC NOT NULL
//                                DEFAULT (0),
//     type_log           NUMERIC NOT NULL,
//     log_datetime_paste TEXT    DEFAULT (datetime('now') ) 
//                                NOT NULL
// );



final class LogFileFront extends NoksMigration
{
    public string $name = 'log_file_front';
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
        $this->setColumn('log_json', 'longtext', [
            'null' => false,
        ]);
        $this->setColumn('status', 'int', [
            'null' => false,
            'default' => 0
        ]);
        $this->setColumn('type_log', 'int', [
            'null' => false,
        ]);
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
