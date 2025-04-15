<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\Channel\StatusChannelEnum;

final class StatIntegrationChannelYandexDirect extends NoksMigration
{
    public string $name = 'stat_integration_channel_yandex_direct';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['integration_id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [];

    public function up(): void
    {
        $this->setColumn('integration_id', 'int', [
            'null'     => false,
            'identity' => true,
            'signed'   => false,
        ]);
        $this->setColumn('status', 'tinyint', [
            'null'     => false,
            'signed'   => false,
            'comment'  => StatusChannelEnum::class,
            'default'  => StatusChannelEnum::ACTIVE->v(),
        ]);
        $this->setColumn('name', 'varchar', []);
        // TODO убрать отовсюду
        // $this->setColumn('stat_id', 'int', [
        //     'null' => false,
        //     'signed' => false,
        // ]);
        $this->setColumn('last_query_api', 'timestamp', [
            'comment' => 'Последний запрос к API',
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
