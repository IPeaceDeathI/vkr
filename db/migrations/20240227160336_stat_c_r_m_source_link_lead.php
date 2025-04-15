<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\CRM\CRMEnum;
use Noks\Enum\Stat\Integration\Source\SourceEnum;

/**
 * @param \Noks\Model\Stat\Integration\StatCRMSourceLinkLeadModel
 * INFO для аналитики |
 * связь между CRM заявки и Source заявки
 */
final class StatCRMSourceLinkLead extends NoksMigration
{
    public string $name = 'stat_crm_source_link_lead';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [
        // [
        //     'columns' => [''],
        //     'options' => [
        //         'unique' => true,
        //     ],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('id', 'int', [
            'null'     => false,
            'identity' => true,
            'signed'   => false,
            'comment' => 'id связи'
        ]);
        // ------------------------------------------------------------------
        // интеграции
        // ------------------------------------------------------------------
        $this->setColumn('source_integration_id', 'int', [
            'null'     => false,
            'signed'   => false,
        ]);
        $this->setColumn('crm_integration_id', 'int', [
            'null'     => false,
            'signed'   => false,
        ]);
        // 
        $this->setColumn('crm_type', 'int', [
            'null'     => false,
            'signed'   => false,
            'comment' => CRMEnum::class,
        ]);
        $this->setColumn('source_type', 'int', [
            'null'     => false,
            'signed'   => false,
            'comment' => SourceEnum::class,
        ]);
        // ------------------------------------------------------------------
        // заявки
        // ------------------------------------------------------------------
        $this->setColumn('source_lead_id', 'bigint', [
            'null'     => false,
            'signed'   => false,
        ]);
        $this->setColumn('crm_lead_id', 'bigint', [
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
