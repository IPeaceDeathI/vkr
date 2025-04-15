<?php
declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';
use Noks\Migration\NoksMigration;

final class Quiz extends NoksMigration
{
    public string $name = 'quiz';

    public array $settingTable = [
        'id' => false,
        'primary_key' => ['quiz_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['quiz_id_flow'],
            'options' => [],
        ]
    ];

    public function up (): void
    {
        $this->setColumn('quiz_id', 'integer', [
            'null' => false,
            'signed' => false,
            'identity' => true,
        ]);
        $this->setColumn('quiz_id_flow', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('quiz_id_status', 'integer', [
            'signed' => false,
        ]);
        $this->setColumn('quiz_id_user_create', 'integer', [
            'signed' => false,
        ]);
        $this->setColumn('quiz_title', 'string', [
            'limit' => 255,
        ]);
        $this->setColumn('quiz_ques', 'longtext', [
        ]);
        $this->setColumn('quiz_setting', 'longtext', [
        ]);
        $this->setColumn('quiz_count_ques', 'int', [
            'signed' => false,
        ]);
        $this->setColumn('quiz_date_create', 'timestamp', [
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('quiz_date_update', 'timestamp', [
            'update' => 'CURRENT_TIMESTAMP',
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('quiz_views', 'integer', [
            'signed' => false,
            'default' => 0
        ]);
        if($this->hasTable($this->name))
        {
            $this->updateTable();
            $this->removeUnnecessaryColumns();
            $this->addIndicesTable();
            return;
        }

        $this->createTable();
        $this->updateTable();
        $this->addIndicesTable();
    }

    public function down (): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
