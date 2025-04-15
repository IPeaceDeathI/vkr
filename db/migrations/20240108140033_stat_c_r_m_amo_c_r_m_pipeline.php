<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class StatCRMAmoCRMPipeline extends NoksMigration
{
    public string $name = 'stat_crm_amocrm_pipeline';
    public array $settingTable = [
        'id' => false,
        // 'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['id', 'integration_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('integration_id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('name', 'varchar', [
            'null' => false,
        ]);
        $this->setColumn('is_archive', 'tinyint', [
            'null' => false,
        ]);
        $this->setColumn('raw', 'text', []);

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
        #$this->table($this->name)->drop()->save();
    }
}
