<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Constructor\WidgetPositionEnum;
use Noks\Enum\Constructor\WidgetStatusEnum;

final class ConstructorWidget extends NoksMigration
{
    public string $name = 'constructor2_widget';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['widget_id'],
        'encoding' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ];

    public function up(): void
    {
        $this->setColumn('widget_id', 'int', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('site_page_id', 'int', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('position', 'int', [
            'null' => false,
            'signed' => false,
            'default' => 1,
        ]);
        $this->setColumn('status', 'tinyint', [
            'null' => false,
            'signed' => false,
            'default' => 1,
            'comment' => WidgetStatusEnum::class,
        ]);
        $this->setColumn('name', 'varchar', [
            'null' => false,
            'limit' => 255,
        ]);
        $this->setColumn('css', 'text', []);
        $this->setColumn('js', 'text', []);
        $this->setColumn('html', 'text', []);
        $this->setColumn('file', 'text', [
            'comment' => 'JSON',
        ]);
        $this->setColumn('area', 'tinyint', [
            'null' => false,
            'signed' => false,
            'comment' => WidgetPositionEnum::class,
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
