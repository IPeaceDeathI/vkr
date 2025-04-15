<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\TypeErrorEnum;

/**
 * @param \Noks\Model\Stat\Integration\StatIntegrationErrorModel
 * ошибки интеграции
 */
final class StatIntegrationErrors extends NoksMigration
{
    public string $name = 'stat_integration_errors';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['integration_id', 'type_error'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('id', 'int', [
            'null'    => false,
            'signed'  => false,
            'identity' => true,
        ]);
        $this->setColumn('integration_id', 'int', [
            'null'    => false,
            'signed'  => false,
        ]);
        $this->setColumn('type_error', 'int', [
            'null'    => false,
            'signed'  => false,
            'comment' => TypeErrorEnum::class,
        ]);
        $this->setColumn('context', 'text', [
            'comment' => 'JSON',
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
