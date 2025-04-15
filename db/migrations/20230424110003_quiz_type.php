<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Phinx\Db\Adapter\MysqlAdapter;

final class QuizType extends NoksMigration
{
    public string $name = 'quiz_type';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['type_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public function up(): void
    {
        $this->setColumn('type_id', 'integer', [
            'identity' => true,
            'signed' => false,
            'limit' => MysqlAdapter::INT_MEDIUM
        ]);
        $this->setColumn('type_name', 'string', [
            'null' => true,
            'limit' => 100
        ]);
        $this->setColumn('type_status', 'integer', [
            'default' => 1,
            'null' => true,
            'limit' => MysqlAdapter::INT_TINY
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

        // активные типы
        $rows = [
            [
                'type_id' => 1,
                'type_name' => 'Варианты ответов',
            ],
            [
                'type_id' => 2,
                'type_name' => 'Варианты и картинка',
            ],
            [
                'type_id' => 3,
                'type_name' => 'Ползунок',
                'type_status'  => 0,
            ],
            [
                'type_id' => 4,
                'type_name' => 'Дата',
                'type_status'  => 0,
            ],
            [
                'type_id' => 5,
                'type_name' => 'Выпадающий список',
                'type_status'  => 0,
            ],
            [
                'type_id' => 6,
                'type_name' => 'Свое поля для ввода',
                'type_status'  => 0,
            ],
        ];
        $table = $this->table($this->name);
        $table->insert($rows)->saveData();
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
