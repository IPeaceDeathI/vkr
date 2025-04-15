<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\StatusBlock;

final class Construtor2Blocks extends NoksMigration
{
    public string $name = 'constructor2_blocks';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['id'],
        'encoding' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ];

    public function up(): void
    {
        $this->setColumn('id', 'integer', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('name', 'string', [
            'limit' => 100,
        ]);
        $this->setColumn('structure', 'longtext', [
            'comment' => 'JSON',
        ]);
        $this->setColumn('preview_src', 'string', [
            'limit' => 255,
        ]);
        $this->setColumn('user_id', 'integer', [
            'null' => false,
            'signed' => false,
            'comment' => 'creator id',
        ]);
        $this->setColumn('status', 'integer', [
            'signed' => false,
            'default' => '2',
            'comment' => StatusBlock::class,
        ]);
        $this->setColumn('created_at', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('updated_at', 'timestamp', [
            'null' => false,
            'update' => 'CURRENT_TIMESTAMP',
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
