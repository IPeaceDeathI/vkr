<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\EntityTypeEnum;
use Noks\Interface\Rights\OptionInterface;
use Noks\Enum\Rights\Collection\GroupUserEnum;

final class EntityRightsLinks extends NoksMigration
{
    public string $name = 'entity_rights_links';
    public array $settingTable = [
        'id' => false,
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['id_entity', 'id_option', 'entity_type'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('id_entity', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('id_option', 'integer', [
            'null' => false,
            'signed' => false,
            'comment' => OptionInterface::class,
        ]);
        $this->setColumn('entity_type', 'integer', [
            'null' => false,
            'signed' => false,
            'comment' => EntityTypeEnum::class,
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


        $rows = [
            [
                'id_entity'   => 1,
                'id_option'   => GroupUserEnum::SUPER_ADMIN->v(),
                'entity_type' => EntityTypeEnum::FLOW->v(),
            ],
        ];

        $table = $this->table($this->name);
        $table->insert($rows)->saveData();
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
