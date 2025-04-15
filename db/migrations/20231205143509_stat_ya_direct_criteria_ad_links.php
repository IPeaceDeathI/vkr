<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class StatYaDirectCriteriaAdLinks extends NoksMigration
{
    public string $name = 'stat_ya_direct_criteria_ad_links';
    public array $settingTable = [
        'id' => false,
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['criteria_id', 'ad_id', 'integration_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('integration_id', 'int', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('criteria_id', 'bigint', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('ad_id', 'bigint', [
            'null' => false,
            'signed' => false,
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
        // $this->table($this->name)->drop()->save();
    }
}
