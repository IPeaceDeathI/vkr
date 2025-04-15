<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\SourceVisitEnum;

/**
 * полученные домены из визитов
 */
final class StatExternalSourceDomain extends NoksMigration
{
    public string $name = 'stat_external_source_domain';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [
        // [
        // 'columns' => ['hash'],
        // 'options' => [
        // 'unique' => true,
        // ],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('id', 'int', [
            'null'     => false,
            'identity' => true,
            'signed'   => false,
        ]);
        $this->setColumn('parent_id', 'int', [
            'signed'   => false,
        ]);
        $this->setColumn('domain', 'varchar', [
            'null'     => false,
            'limit'     => 255,
        ]);
        $this->setColumn('show_name', 'varchar', [
            'limit'     => 255,
            'comment'   => 'показываемое значения вместо "domain"',
        ]);
        $this->setColumn('hash', 'int', [
            'signed'   => false,
            'null'     => false,
            'limit'    => 10,
        ]);
        $this->setColumn('source', 'tinyint', [
            'null'     => false,
            'comment' => SourceVisitEnum::class,
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
