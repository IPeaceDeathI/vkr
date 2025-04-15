<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\Stat\StatModel
 */
final class Stat extends NoksMigration
{
    public string $name = 'stat';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['stat_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            // INFO добавил инвекс, потому что у нас каждый заход на сайт, счетчик проверяет что есть ли проект
            'columns' => ['num_hash_stat_id'],
            'options' => [],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('stat_id', 'int', [
            'signed'   => false,
            'null'     => false,
            'identity' => true,
        ]);
        $this->setColumn('flow_id', 'int', [
            'signed'   => false,
            'null'     => false,
        ]);
        $this->setColumn('user_id', 'int', [
            'signed'   => false,
            'null'     => false,
        ]);
        $this->setColumn('name', 'varchar', []);
        $this->setColumn('num_hash_stat_id', 'int', [
            'signed' => false,
            'limit' => 10,
        ]);
        $this->setColumn('hash_stat_id', 'varchar', [
            'limit' => 40,
        ]);
        $this->setColumn('last_counter_view', 'date', [
            'comment' => 'последняя дата подсчета визитов'
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
