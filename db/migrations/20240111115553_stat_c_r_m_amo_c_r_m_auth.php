<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class StatCRMAmoCRMAuth extends NoksMigration
{
    public string $name = 'stat_crm_amocrm_auth';
    public array $settingTable = [
        'id' => false,
        // 'primary_key' => ['id'],
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
        $this->setColumn('client_id', 'varchar', [
            'null' => false,
        ]);
        $this->setColumn('client_secret', 'varchar', [
            'null' => false,
        ]);
        $this->setColumn('redirect_uri', 'text', [
            'null' => false,
        ]);
        $this->setColumn('access_token', 'text', [
            'null' => false,
        ]);
        $this->setColumn('refresh_token', 'text', [
            'null' => false,
        ]);
        $this->setColumn('expires', 'integer', [
            'null' => false,
        ]);
        $this->setColumn('base_domain', 'varchar', [
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
        #$this->table($this->name)->drop()->save();
    }
}
