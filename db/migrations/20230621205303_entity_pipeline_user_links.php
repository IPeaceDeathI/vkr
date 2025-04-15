<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\EntityTypeEnum;

final class EntityPipelineUserLinks extends NoksMigration
{
    public string $name = 'entity_crm_pipline_user_links';
    public array $settingTable = [
        'id' => false,
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => [
                'entity_type',
                'entity_id',
            ],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('entity_type', 'integer', [
            'signed' => false,
            'null' => false,
            'comment' => EntityTypeEnum::class,
        ]);
        $this->setColumn('entity_id', 'integer', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('crm_pipeline_id', 'integer', [
            'signed' => false,
            'null' => false,
            'comment' => 'crm id воронка',
        ]);
        // может быть null так как не везде могут быть ответственные
        $this->setColumn('crm_user_id', 'integer', [
            'signed' => false,
            'comment' => 'crm id пользователя',
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
