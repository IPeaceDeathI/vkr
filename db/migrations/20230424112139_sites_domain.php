<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\StatusDomainEnum;

final class SitesDomain extends NoksMigration
{
    public string $name = 'sites_domain';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['domain'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        // if($this->hasTable($this->name)) return;
        // $sql = 'CREATE TABLE `sites_domain` (
        //     `id` int unsigned NOT NULL AUTO_INCREMENT,
        //     `id_user_create` int unsigned NOT NULL,
        //     `domain` varchar(255) NOT NULL,
        //     `id_site` int unsigned NOT NULL,
        //     `add_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        //     `update_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        //     `status` tinyint(1) NOT NULL DEFAULT "0" COMMENT "0 - deactive, 1 - active, 5 - trash",
        //     PRIMARY KEY (`id`),
        //     UNIQUE KEY (`domain`)
        //   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        // ';
        // $this->execute($sql);

        $this->setColumn('id', 'int', [
            'null' => false,
            'signed' => false,
            'identity' => true,
        ]);
        $this->setColumn('id_user_create', 'int', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('ssl', 'tinyint', [
            'null' => false,
            'signed' => false,
            'default' => '0',
        ]);
        $this->setColumn('ssl_active', 'timestamp', [
            'comment' => 'время активации',
        ]);
        $this->setColumn('ssl_task', 'timestamp', [
            'comment' => 'время выдачи задания',
        ]);
        $this->setColumn('hash_domain', 'int', [
            // 'null' => false, // нужно перевести все текущие домены в хеш, потом раскоментить
            'limit'  => 10,
            'signed' => false,
        ]);
        $this->setColumn('domain', 'varchar', [
            'null' => false,
        ]);
        $this->setColumn('id_site', 'int', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('add_date_time', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('update_date_time', 'timestamp', [
            'null' => false,
            'update' => 'CURRENT_TIMESTAMP',
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('status', 'tinyint', [
            'null' => false,
            'signed' => false,
            'default' => 0,
            'comment' => StatusDomainEnum::class . ' (0 - NOT_ACTIVE | 1 - ACTIVE)',
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
