<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\WebHook;
use Noks\Enum\StatusWebHook;

final class WebHooks extends NoksMigration
{
    public string $name = 'web_hooks';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['hook_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['hook_entity_id', 'hook_entity_type', 'hook_source_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('hook_id', 'int', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('hook_source_id', 'int', [
            'null' => false,
            'signed' => false,
            'comment' => WebHook::class,
        ]);
        $this->setColumn('hook_entity_id', 'int', [
            'null' => false,
            'signed' => false,
            // 'comment' => '',
        ]);
        $this->setColumn('hook_entity_type', 'int', [
            'null' => false,
            'signed' => false,
            'comment' => EntityTypeEnum::class,
        ]);
        $this->setColumn('hook_status', 'tinyint', [
            'null' => false,
            'signed' => false,
            'comment' => StatusWebHook::class,
            'default' => '1',
        ]);
        $this->setColumn('hook_key', 'string', [
            'limit' => 40,
        ]);
        $this->setColumn('hook_last_send', 'timestamp', [
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
