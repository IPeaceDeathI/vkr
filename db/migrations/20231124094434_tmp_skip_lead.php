<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\EntityTypeEnum;

final class TmpSkipLead extends NoksMigration
{
    public string $name = 'tmp_skip_lead';
    public array $settingTable = [
        'id' => false,
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
        $this->setColumn('entity_type', 'int', [
            'signed'  => false,
            'null'    => false,
            'comment' => EntityTypeEnum::class,
        ]);
        $this->setColumn('entity_id', 'int', [
            'signed' => false,
            'null'   => false,
        ]);
        $this->setColumn('lead_id', 'int', [
            'null'   => false,
            'signed' => false,
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
