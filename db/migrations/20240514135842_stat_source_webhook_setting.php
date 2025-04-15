<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\Stat\Integration\Source\Webhook\StatSourceWebhookSettingModel
 */
final class StatSourceWebhookSetting extends NoksMigration
{
    public string $name = 'stat_source_webhook_setting';
    public array $settingTable = [
        'id' => false,
        // 'primary_key' => [''],
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
        // 
        // ------------------------------------------------------------------

        $this->setColumn('is_enable_sending_lead', 'tinyint', [
            'null' => false,
            'signed' => false,
            'default' => 1,
            'comment' => 'Отправлять заявки в CRM',
        ]);
        $this->setColumn('is_enable_creating_lead_without_contacts', 'tinyint', [
            'null' => false,
            'signed' => false,
            'default' => 1,
            'comment' => 'Создавать заявки без контактных данных',
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
