<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\LeadSourceEnum;

final class CrmLeadsInfo extends NoksMigration
{
    public string $name = 'crm_leads_info';

    public array $settingTable = [
        'id' => false,
        'primary_key' => ['info_id'],
        'encoding' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ];

    public function up(): void
    {
        $this->setColumn('info_id', 'int', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('info_id_flow', 'int', []);
        $this->setColumn('info_id_site', 'int', []);
        $this->setColumn('info_id_user', 'int', []);
        $this->setColumn('info_id_lead', 'int', []);
        $this->setColumn('info_type', 'varchar', [
            'limit' => 32,
            'default' => 'info',
        ]);
        // ------------------------------------------------------------------
        // text
        // ------------------------------------------------------------------
        $this->setColumn('info_text', 'text', [
            'default' => null,
        ]);
        $this->setColumn('info_json', 'text', [
            'comment' => 'JSON',
        ]);
        // ------------------------------------------------------------------
        // timestamp
        // ------------------------------------------------------------------
        $this->setColumn('info_date', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('info_date_edit', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
            'update' => 'CURRENT_TIMESTAMP'
        ]);

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
