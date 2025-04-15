<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\EntityTypeEnum;

/**
 * @param \Noks\Model\DeletedEntities
 * удаленные сущности
 */
final class DeletedEntities extends NoksMigration
{
    public string $name = 'deleted_entities';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
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
        $this->setColumn('id', 'int', [
            'null'    => false,
            'signed'  => false,
            'identity' => true,
        ]);
        $this->setColumn('entity_id', 'int', [
            'null'    => false,
            'signed'  => false,
        ]);
        $this->setColumn('entity_type', 'int', [
            'null'    => false,
            'signed'  => false,
            'comment' => EntityTypeEnum::class,
        ]);

        $this->createdAt();

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
