<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class Constructor2FavouritesBlocks extends NoksMigration
{
    public string $name = 'constructor2_favourites_blocks';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['user_id', 'block_id'],
        'encoding' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ];

    public function up(): void
    {
        $this->setColumn('user_id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('block_id', 'integer', [
            'null' => false,
            'signed' => false,
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
