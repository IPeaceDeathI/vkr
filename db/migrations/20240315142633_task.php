<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * полученные страницы из визитов
 */
final class Task extends NoksMigration
{
    public string $name = 'tasks';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [];

    public function up(): void
    {
        $this->setColumn('id', 'int', [
            'null'     => false,
            'identity' => true,
            'signed'   => false,
        ]);
        $this->setColumn('manager_id', 'varchar', [
            'limit' => 36,
        ]);
        $this->setColumn('class', 'varchar', [
            'null'     => false,
        ]);
        $this->setColumn('method', 'varchar', [
            'null'     => false,
        ]);
        $this->setColumn('repeat_after', 'int', [
            'signed'   => false,
            'comment'  => 'seconds',
        ]);
        $this->setColumn('counter', 'int', [
            'null'     => false,
            'signed'   => false,
            'default'  => 0,
            'comment'  => 'количество выполнений',
        ]);
        $this->setColumn('params', 'text', []);


        $this->setColumn('started_at', 'timestamp', []);
        $this->setColumn('complited_at', 'timestamp', []);
        $this->setColumn('execute_after', 'timestamp', [
            'comment'  => 'когда выполнить',
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
