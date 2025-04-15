<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\SourceVisitEnum;

/**
 * @param \Noks\Model\VisitModel
 */
final class Visit extends NoksMigration
{
    public string $name = 'visit';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['visit_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        // [
        //     'columns' => [],
        //     'options' => [
        //         'unique' => true,
        //     ],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('visit_id', 'string', [
            'null' => false,
            'limit' => 36,
            'comment' => 'uuid7',
        ]);
        $this->setColumn('previous_id', 'string', [
            'limit' => 36,
            'comment' => 'uuid7 (предыдущий visit_id)',
        ]);
        $this->setColumn('break_previous_id', 'string', [
            'limit' => 36,
            'comment' => 'uuid7 (предыдущий visit_id при достижении 14 дней)',
        ]);
        $this->setColumn('hash_stat_id', 'varchar', [
            'null'  => false,
            'limit' => 40,
        ]);
        $this->setColumn('stat_id', 'int', [
            'signed' => false,
            'comment' => 'определяется позже',
        ]);
        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------
        $this->setColumn('source', 'int', [
            'null' => true,
            'signed' => false,
            'comment' => SourceVisitEnum::class . ' определяется позже',
        ]);
        $this->setColumn('other', 'text', []);
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
