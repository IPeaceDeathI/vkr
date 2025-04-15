<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\TypeIntegrationEnum;

final class StatIntegration extends NoksMigration
{
    public string $name = 'stat_integration';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['id'],
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
        $this->setColumn('id', 'integer', [
            'null' => false,
            'signed' => false,
            'identity' => true,
            'comment' => 'integration_id',
        ]);
        $this->setColumn('stat_id', 'int', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('type', 'integer', [
            'null' => false,
            'signed' => false,
            'comment' => TypeIntegrationEnum::class,
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
