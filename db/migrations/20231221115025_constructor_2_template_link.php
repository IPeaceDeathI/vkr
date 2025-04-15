<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class Constructor2TemplateLink extends NoksMigration
{
    public string $name = 'constructor2_template_link';
    public array $settingTable = [
        'id' => false,
        // 'primary_key' => [''],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['template_id', 'category_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('template_id', 'int', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('category_id', 'int', [
            'signed' => false,
            'null' => false,
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
        // $this->table($this->name)->drop()->save();
    }
}
