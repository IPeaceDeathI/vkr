<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\CRM\AmoCRM\StatusAllocationEnum;

final class StatCRMAmoCRMStatusAllocation extends NoksMigration
{
    public string $name = 'stat_crm_amocrm_status_allocation';
    public array $settingTable = [
        'id' => false,
        // 'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['integration_id', 'status_id', 'pipeline_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('integration_id', 'int', [
            'null' => false,
            'signed' => false,
        ]);
        // ------------------------------------------------------------------
        $this->setColumn('status_id', 'int', [
            'signed'  => false,
            'null'    => false,
            'comment' => 'id статуса в amocrm',
        ]);
        $this->setColumn('pipeline_id', 'int', [
            'signed'  => false,
            'null'    => false,
            'comment' => 'id воронки в amocrm',
        ]);
        $this->setColumn('status_allocation', 'tinyint', [
            'signed' => false,
            'null' => false,
            'comment' => StatusAllocationEnum::class,
        ]);
        // ------------------------------------------------------------------

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
