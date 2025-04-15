<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\Source\SourceEnum;

final class StatIntegrationSource extends NoksMigration
{
    public string $name = 'stat_integration_source';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['integration_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        // [
        //     'columns' => [''],
        //     'options' => [
        //         'unique' => true,
        //     ],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('integration_id', 'int', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        // TODO нужен ли status?
        $this->setColumn('type', 'int', [
            'null' => false,
            'signed' => false,
            'comment' => SourceEnum::class,
        ]);
        // ------------------------------------------------------------------
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
