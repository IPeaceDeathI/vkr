<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * INFO таблица связей для старой интеграции что находится в админке |
 * связь между лидами noks и amocrm, связь происходит когда созданные лиды из нашего сервиса передаются в amocrm
 */
final class CRMLinkLead extends NoksMigration
{
    public string $name = 'crm_link_lead';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['lead_id', 'amo_lead_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('id', 'int', [
            'null'     => false,
            'identity' => true,
            'signed'   => false,
        ]);
        $this->setColumn('lead_id', 'int', [
            'null'     => false,
            'signed'   => false,
        ]);
        $this->setColumn('amo_lead_id', 'bigint', [
            'null'     => false,
            'signed'   => false,
        ]);

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
