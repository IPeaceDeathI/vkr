<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Phinx\Db\Adapter\MysqlAdapter;

final class Form extends NoksMigration
{
    public string $name = 'form';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['form_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['form_id_flow'],
            'options' => [],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('form_id', 'integer', [
            'signed' => false,
            'identity' => true,
        ]);
        $this->setColumn('form_id_flow', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('form_id_status', 'integer', [
            'default' => 0,
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('form_id_user_create', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('form_title', 'string', [
            'limit' => 256,
        ]);
        $this->setColumn('form_structure', 'text', [
            'limit' => MysqlAdapter::TEXT_MEDIUM,
        ]);
        $this->setColumn('form_html', 'text', [
            'limit' => MysqlAdapter::TEXT_LONG,
        ]);
        $this->setColumn('form_data_create', 'timestamp', [
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('form_data_update', 'timestamp', [
            'update' => 'CURRENT_TIMESTAMP',
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('form_views', 'integer', [
            'signed' => false,
            'default' => 0
        ]);
        $this->setColumn('form_status', 'tinyint', [
            'signed' => false,
            'default' => 0,
            'comment' => 'status 0 => nonactive, 1 => active'
        ]);
        $this->setColumn('preview_src', 'string', [
            'default' => null,
            'limit' => 255
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
        #$this->table($this->name)->drop()->save();
    }
}
