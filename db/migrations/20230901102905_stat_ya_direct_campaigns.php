<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\Channel\StatusCampaignEnum;

final class StatYaDirectCampaigns extends NoksMigration
{
    public string $name = 'stat_ya_direct_campaigns';
    public array $settingTable = [
        'id' => false,
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => [
                'campaign_id',
                'integration_id'
            ],
            'options' => [
                'unique' => true,
            ],
        ],
    ];

    public function up(): void
    {
        $this->setColumn('campaign_id', 'bigint', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('status', 'int', [
            'null'    => false,
            'signed'  => false,
            'default' => StatusCampaignEnum::ALLOWED->v(),
            'comment' => StatusCampaignEnum::class,
        ]);
        $this->setColumn('integration_id', 'int', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('name', 'string', [
            'limit' => 1000
        ]);
        $this->setColumn('is_master_campaign', 'tinyint', []);
        $this->setColumn('created_at', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('updated_at', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
            'update' => 'CURRENT_TIMESTAMP'
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
