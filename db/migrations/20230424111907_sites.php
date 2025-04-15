<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class Sites extends NoksMigration
{
    public string $name = 'sites';

    public array $settingTable = [
        'id' => false,
        'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    // $sql = 'CREATE TABLE `sites` (
    //     `id` int unsigned NOT NULL AUTO_INCREMENT,
    //     `id_flow` int unsigned NOT NULL,
    //     `id_user_create` int unsigned NOT NULL,
    //     `title` text NOT NULL,
    //     `preview` text,
    //     `code_head` text,
    //     `code_body` text,
    //     `add_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    //     `update_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    //     `status` tinyint(1) NOT NULL DEFAULT "1" COMMENT "1 - active, 5 - trash",
    //     PRIMARY KEY (`id`)
    //   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    // ';

    public function up(): void
    {
        $this->setColumn('id', 'integer', [
            'identity' => true,
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('id_flow', 'integer', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('id_user_create', 'integer', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('title', 'text', [
            'null' => false,
        ]);
        $this->setColumn('preview', 'text', []);
        $this->setColumn('code_head', 'text', []);
        $this->setColumn('code_body', 'text', []);
        $this->setColumn('status', 'tinyint', [
            'signed' => false,
            'null' => false,
            'default' => '1',
        ]);
        $this->setColumn('add_date_time', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('update_date_time', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
            'update' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('access_code', 'int', [
            'limit'    => 6,
            'signed'  => false,
            'comment' => 'Код доступа к сайту',
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

        $rows = [
            [
                // для лендингов
                'id' => 1,
                'id_flow' => 1,
                'id_user_create' => 1,
                'title' => 'Main landing',
            ],
            [
                // для шаблонов
                'id' => 2,
                'id_flow' => 1,
                'id_user_create' => 1,
                'title' => 'Templates',
            ]
        ];

        $table = $this->table($this->name);
        $table->insert($rows)->saveData();
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
