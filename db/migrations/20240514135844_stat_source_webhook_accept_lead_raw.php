<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\Source\StatusPrepareLeadEnum;

/**
 * @param \Noks\Model\Stat\Integration\Source\Webhook\StatSourceWebhookAcceptLeadRawModel
 */
final class StatSourceWebhookAcceptLeadRaw extends NoksMigration
{
    public string $name = 'stat_source_webhook_accept_lead_raw';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [];

    public function up(): void
    {
        $this->setColumn('id', 'int', [
            'null'    => false,
            'signed'  => false,
            'identity' => true,
        ]);
        $this->setColumn('integration_id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('status_prepare', 'int', [
            'signed'  => false,
            'comment' => StatusPrepareLeadEnum::class,
        ]);
        $this->setColumn('payload', 'text', [
            'null' => false,
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
        // $this->table($this->name)->drop()->save();
    }
}
