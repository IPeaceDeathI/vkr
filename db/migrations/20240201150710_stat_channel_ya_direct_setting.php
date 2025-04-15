<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Enum\YesNoEnum;
use Noks\Migration\NoksMigration;

final class StatChannelYaDirectSetting extends NoksMigration
{
    public string $name = 'stat_channel_ya_direct_setting';
    public array $settingTable = [
        'id' => false,
        // 'primary_key' => [''],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['integration_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('integration_id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        // ------------------------------------------------------------------
        $this->setColumn('add_new_campaign', 'tinyint', [
            'null'    => false,
            'default' => YesNoEnum::YES->v(),
            'comment' => YesNoEnum::class . ' Добавлять новые кампании?',
        ]);
        $this->setColumn('import_template_campaign', 'varchar', [
            'comment' => 'Добавлять только кампании название которых содержит',
        ]);
        $this->setColumn('nds', 'text', [
            'comment' => 'JSON<mixed[]> НДС',
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
        // $this->table($this->name)->drop()->save();
    }
}
