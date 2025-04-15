<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Constructor\StatusTemplateEnum;

final class Constructor2Template extends NoksMigration
{
    public string $name = 'constructor2_template';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['template_id'],
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
        $this->setColumn('template_id', 'int', [
            'signed' => false,
            'null' => false,
            'identity' => true,
        ]);
        $this->setColumn('user_id', 'int', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('flow_id', 'int', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('status', 'int', [
            'signed' => false,
            'comment' => StatusTemplateEnum::class,
        ]);
        $this->setColumn('name', 'varchar', [
            'null' => false,
        ]);
        $this->setColumn('preview_url', 'varchar', []);
        $this->setColumn('structure', 'longtext', [
            'comment' => 'JSON Structure used in current html',
        ]);
        $this->setColumn('last_structure', 'longtext', [
            'comment' => 'JSON Structure for constructor',
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
        // $this->table($this->name)->drop()->save();
    }
}
