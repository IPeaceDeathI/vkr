<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

// CREATE TABLE logs_not_json (
//     not_id             INTEGER PRIMARY KEY AUTOINCREMENT
//                                NOT NULL,
//     not_content        TEXT    NOT NULL,
//     not_datetime_paste TEXT    NOT NULL
//                                DEFAULT (datetime('now') ) 
// );


final class LogFileNotJson extends NoksMigration
{
    public string $name = 'log_file_not_json';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['not_id'],
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
        $this->setColumn('not_id', 'int', [
            'identity' => true,
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('not_content', 'longtext', [
            'null' => false,
        ]);
        $this->createdAt('not_datetime_paste');

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
