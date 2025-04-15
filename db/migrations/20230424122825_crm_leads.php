<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\LeadSourceEnum;

final class CrmLeads extends NoksMigration
{
    public string $name = 'crm_leads';

    public array $settingTable = [
        'id' => false,
        'primary_key' => ['lead_id'],
        'encoding' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ];

    public function up(): void
    {
        $this->setColumn('lead_id', 'int', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('lead_id_flow', 'int', []);
        $this->setColumn('lead_source_entity', 'int', [
            'comment' => LeadSourceEnum::class,
        ]);
        $this->setColumn('lead_id_entity', 'int', []);
        $this->setColumn('lead_id_page', 'int', []);
        $this->setColumn('lead_id_site', 'int', []);
        $this->setColumn('lead_status', 'int', [
            'default' => '0'
        ]);
        // ------------------------------------------------------------------
        // text
        // ------------------------------------------------------------------
        $this->setColumn('lead_name', 'text', []);
        $this->setColumn('lead_phone', 'text', []);
        $this->setColumn('lead_email', 'text', []);
        $this->setColumn('lead_url', 'text', []);
        $this->setColumn('lead_utm_source', 'text', []);
        $this->setColumn('lead_utm_medium', 'text', []);
        $this->setColumn('lead_utm_campaign', 'text', []);
        $this->setColumn('lead_utm_content', 'text', []);
        $this->setColumn('lead_utm_term', 'text', []);
        $this->setColumn('lead_utm_referrer', 'text', []);
        $this->setColumn('lead_fields', 'text', [
            'comment' => 'JSON',
        ]);
        // ------------------------------------------------------------------
        // varchar
        // ------------------------------------------------------------------
        $this->setColumn('lead_roistat_visit', 'varchar', [
            'limit' => 25,
        ]);
        // ------------------------------------------------------------------
        // VISIT
        // ------------------------------------------------------------------
        $this->setColumn('lead_general_visit', 'varchar', [
            'limit'   => 36,
            'comment' => 'uuid7',
        ]);
        // $this->setColumn('lead_session_visit', 'varchar', [
        //     'limit'   => 36,
        //     'comment' => 'uuid7',
        // ]);
        $this->setColumn('lead_view_visit', 'varchar', [
            'limit'   => 36,
            'comment' => 'uuid7',
        ]);
        // ------------------------------------------------------------------
        // CRM
        // ------------------------------------------------------------------
        $this->setColumn('lead_budget', 'int', [
            'null' => false,
            'default' => '0',
        ]);
        // ------------------------------------------------------------------
        // timestamp
        // ------------------------------------------------------------------
        $this->setColumn('lead_date', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('lead_date_edit', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
            'update' => 'CURRENT_TIMESTAMP'
        ]);
        // $this->setColumn('deleted_at', 'timestamp', []);

        if ($this->hasTable($this->name)) {
            // если dev среда, тогда удаляем лишние колонки
            $this->updateTable();
            if (isDev()) $this->removeUnnecessaryColumns();
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
