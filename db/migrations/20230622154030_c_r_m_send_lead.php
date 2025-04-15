<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\CRMEnum;

final class CRMSendLead extends NoksMigration
{
    public string $name = 'crm_send_lead';
    public array $settingTable = [
        'id' => false,
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['crm_source_id', 'crm_entity_type', 'crm_entity_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('crm_source_id', 'integer', [
            'signed' => false,
            'null' => false,
            'comment' => CRMEnum::class,
        ]);
        $this->setColumn('crm_entity_type', 'integer', [
            'signed' => false,
            'null' => false,
            'comment' => EntityTypeEnum::class,
        ]);
        $this->setColumn('crm_entity_id', 'integer', [
            'signed' => false,
            'null' => false,
            'comment' => 'ид сущности',
        ]);
        $this->setColumn('crm_last_send', 'timestamp', [
            'comment' => 'время последнего отправления лида',
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
