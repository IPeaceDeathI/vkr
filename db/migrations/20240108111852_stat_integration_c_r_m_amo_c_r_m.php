<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\CRM\AmoCRM\StatusAmoCRMEnum;

final class StatIntegrationCRMAmoCRM extends NoksMigration
{
    public string $name = 'stat_integration_crm_amocrm';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['integration_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public function up(): void
    {
        $this->setColumn('integration_id', 'int', [
            'null'     => false,
            'identity' => true,
            'signed'   => false,
        ]);
        // TODO нужно его убрать отовсюду
        // $this->setColumn('stat_id', 'int', [
        //     'null' => false,
        //     'signed' => false,
        // ]);
        $this->setColumn('status', 'tinyint', [
            'comment' => StatusAmoCRMEnum::class,
        ]);
        $this->setColumn('last_refresh', 'timestamp', []);
        $this->setColumn('last_refresh_pipeline', 'timestamp', []);
        $this->setColumn('last_refresh_user', 'timestamp', []);
        $this->setColumn('last_refresh_field', 'timestamp', []);
        $this->setColumn('last_refresh_status', 'timestamp', []);
        $this->setColumn('last_refresh_lead', 'timestamp', []);
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
