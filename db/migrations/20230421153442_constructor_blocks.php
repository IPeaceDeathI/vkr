<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class ConstructorBlocks extends NoksMigration
{
    public string $name = 'constructor_blocks';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['block_id'],
        'encoding' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ];

    public function up(): void
    {
        $this->setColumn('block_id', 'integer', [
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('block_name', 'string', [
            'limit' => 60,
            'null' => true,
            'default' => null,
        ]);
        $this->setColumn('block_structure', 'json', [
            'null' => true,
            'default' => null,
        ]);
        $this->setColumn('block_preview_src', 'string', [
            'null' => true,
            'default' => null,
            'limit' => 255,
        ]);
        $this->setColumn('block_priority_preview_src', 'string', [
            'null' => true,
            'default' => null,
            'limit' => 255,
        ]);
        $this->setColumn('creator_id', 'integer', [
            'null' => true,
            'default' => null,
        ]);
        $this->setColumn('block_date', 'timestamp', [
            'null' => true,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('block_date_edit', 'timestamp', [
            'null' => true,
            'update' => 'CURRENT_TIMESTAMP',
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('block_status', 'integer', [
            'signed' => false,
            'default' => '2',
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
