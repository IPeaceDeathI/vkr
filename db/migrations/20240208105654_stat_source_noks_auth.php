<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class StatSourceNoksAuth extends NoksMigration
{
    public string $name = 'stat_source_noks_auth';
    public array $settingTable = [
        'id' => false,
        // 'primary_key' => [''],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['integration_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('integration_id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        // ------------------------------------------------------------------
        $this->setColumn('site_id', 'integer', [
            'null' => false,
        ]);
        // ------------------------------------------------------------------
        $this->createdAt();
        $this->updatedAt();


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
