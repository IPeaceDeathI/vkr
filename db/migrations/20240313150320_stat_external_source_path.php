<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * полученные страницы из визитов
 */
final class StatExternalSourcePath extends NoksMigration
{
    public string $name = 'stat_external_source_path';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [
        // [
        //     'columns' => ['domain_id', 'hash'],
        //     'options' => [
        //         'unique' => true,
        //     ],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('id', 'int', [
            'null'     => false,
            'identity' => true,
            'signed'   => false,
        ]);
        $this->setColumn('domain_id', 'int', [
            'null'     => false,
        ]);
        $this->setColumn('hash', 'int', [
            'signed' => false,
            'null'   => false,
            'limit'  => 10,
        ]);
        $this->setColumn('path', 'varchar', [
            'null'  => false,
            'limit' => 4096,
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
