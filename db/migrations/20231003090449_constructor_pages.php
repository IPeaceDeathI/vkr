<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Phinx\Db\Adapter\MysqlAdapter;
use Noks\Migration\NoksMigration;

final class ConstructorPages extends NoksMigration
{
    public string $name = 'constructor_pages';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public function up(): void
    {
        $this->setColumn('id', 'integer', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('page_id', 'integer', [
            'null'    => false,
            'signed'  => false,
            'comment' => 'site_page_id',
        ]);
        $this->setColumn('user_id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('structure', 'longtext', [
            'comment' => 'JSON Structure used in current html',
        ]);
        $this->setColumn('last_structure', 'longtext', [
            'comment' => 'JSON Structure for constructor',
        ]);
        $this->setColumn('html', 'longtext', []);
        $this->setColumn('style', 'longtext', [
            'comment' => 'CSS',
        ]);
        $this->setColumn('created_at', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('updated_at', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
            'update' => 'CURRENT_TIMESTAMP'
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
