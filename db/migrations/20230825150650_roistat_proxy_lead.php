<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\StatusRoistatProxyLeadEnum;

final class RoistatProxyLead extends NoksMigration
{
    public string $name = 'roistat_proxylead';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['proxy_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['proxy_entity_id', 'proxy_entity_type', 'proxy_key'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('proxy_id', 'int', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('proxy_entity_id', 'int', [
            'null' => false,
            'signed' => false,
            // 'comment' => '',
        ]);
        $this->setColumn('proxy_entity_type', 'int', [
            'null' => false,
            'signed' => false,
            'comment' => EntityTypeEnum::class,
        ]);
        $this->setColumn('proxy_status', 'tinyint', [
            'null' => false,
            'signed' => false,
            'comment' => StatusRoistatProxyLeadEnum::class,
            'default' => '1',
        ]);
        $this->setColumn('proxy_key', 'string', [
            'limit' => 80,
        ]);
        $this->setColumn('proxy_fields', 'text', []);
        $this->setColumn('proxy_last_send', 'timestamp', [
            'comment' => 'время последнего отправления',
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
