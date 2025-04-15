<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Phinx\Db\Adapter\MysqlAdapter;
use Noks\Migration\NoksMigration;

final class PagesHash extends NoksMigration
{
    public string $name = 'pages_hash';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['hash_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['hash_page'],
            'options' => [],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('hash_id', 'integer', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('hash_page', 'integer', [
            'null'    => false,
            'comment' => 'site_page_id',
        ]);
        // $this->setColumn('hash_status', 'string', [
        //     'limit' => 32,
        //     'null' => true,
        //     'default' => null,
        // ]);
        // $this->setColumn('hash_project', 'string', [
        //     'limit' => 32,
        //     'null' => true,
        //     'default' => null,
        // ]);
        $this->setColumn('hash_uid', 'integer', [
            'null'    => false,
            'comment' => 'user_id',
        ]);
        $this->setColumn('hash_text', 'text', [
            'null' => true,
            'default' => null,
            'limit' => MysqlAdapter::TEXT_LONG,
            'comment' => 'JSON Structure',
        ]);
        $this->setColumn('hash_html', 'text', [
            'null'    => true,
            'default' => null,
            'limit'   => MysqlAdapter::TEXT_LONG
        ]);
        $this->setColumn('hash_styles', 'text', [
            'null' => true,
            'default' => null,
            'limit' => MysqlAdapter::TEXT_LONG,
            'comment' => 'CSS',
        ]);
        $this->setColumn('hash_date', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('hash_update_date', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
            'update' => 'CURRENT_TIMESTAMP',
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
