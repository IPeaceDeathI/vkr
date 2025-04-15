<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\TypeReportEnum;

final class StatReport extends NoksMigration
{
    public string $name = 'stat_report';
    public array $settingTable = [
        'id' => false,
        'primary_key' => 'report_id',
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
        $this->setColumn('report_id', 'int', [
            'signed'   => false,
            'identity' => true,
            'null'     => false,
        ]);
        $this->setColumn('report_type', 'int', [
            'signed'  => false,
            'null'    => false,
            'comment' => TypeReportEnum::class,
        ]);
        $this->setColumn('stat_id', 'int', [
            'signed' => false,
            'null'   => false,
        ]);
        $this->setColumn('name', 'varchar', [
            'null'    => false,
            'comment' => 'имя отчета',
        ]);
        $this->setColumn('order_nesting', 'text', [
            'null'    => true,
            'comment' => 'JSON<array<int[]>> порядок вложенность/группировка',
        ]);
        $this->setColumn('show_columns', 'text', [
            'null'    => true,
            'comment' => 'JSON<string[]> видимые показатели',
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
