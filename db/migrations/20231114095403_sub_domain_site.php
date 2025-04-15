<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class SubDomainSite extends NoksMigration
{
    public string $name = 'sub_domain_site';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['site_id'],
        'encoding' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ];

    public array $my_indices = [
        [
            'columns' => ['sub_domain'],
            'options' => [
                'unique' => true,
            ],
        ],
    ];

    public function up(): void
    {
        $this->setColumn('site_id', 'int', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('sub_domain', 'varchar', [
            'null' => false,
            'limit' => 11,
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
