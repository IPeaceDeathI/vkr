<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\CRMEnum;

final class CRMTokens extends NoksMigration
{
    public string $name = 'crm_tokens';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['token_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public function up(): void
    {
        $this->setColumn('token_id', 'integer', [
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('token_source_id', 'integer', [
            'signed' => false,
            'null' => false,
            'comment' => CRMEnum::class,
        ]);
        $this->setColumn('token_entity_id', 'integer', [
            'null' => false,
            'signed' => false,
            'comment' => 'id сущности',
        ]);
        $this->setColumn('token_entity_type', 'integer', [
            'null' => false,
            'signed' => false,
            'comment' => EntityTypeEnum::class,
        ]);
        $this->setColumn('token_value', 'text', [
            'comment' => 'JSON',
        ]);
        $this->setColumn('token_value_2', 'text', [
            'comment' => 'JSON - client_id, client_secret',
        ]);
        $this->setColumn('token_create', 'timestamp', [
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('token_update', 'timestamp', [
            'update'  => 'CURRENT_TIMESTAMP',
            'default' => 'CURRENT_TIMESTAMP',
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
