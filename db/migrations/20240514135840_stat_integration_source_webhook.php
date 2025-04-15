<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\Source\SourceEnum;

/**
 * @param \Noks\Model\Stat\Integration\Source\Webhook\StatIntegrationSourceWebhookModel
 */
final class StatIntegrationSourceWebhook extends NoksMigration
{
    public string $name = 'stat_integration_source_webhook';
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
        $this->setColumn('name', 'varchar', [
            'default' => 'webhook',
        ]);
        $this->setColumn('source_webhook_type', 'int', [
            'signed'   => false,
            'null'     => false,
            'comment' => SourceEnum::class,
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
