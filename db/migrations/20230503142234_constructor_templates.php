<?php
declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';
use Noks\Migration\NoksMigration;
use Phinx\Db\Adapter\MysqlAdapter;

final class ConstructorTemplates extends NoksMigration
{
    public string $name = 'constructor_templates';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['tpl_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['tpl_id_flow'],
            'options' => [],
        ]
    ];

    public function up (): void
    {
        $this->setColumn('tpl_id', 'integer', [
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('tpl_id_user_creator', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('tpl_id_flow', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('tpl_id_category', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('tpl_title', 'string', [
            'null' => true,
            'limit' => 255
        ]);
        $this->setColumn('tpl_preview_src', 'string', [
            'null' => true,
            'default' => null,
            'limit' => 512
        ]);
        $this->setColumn('tpl_blocks_structure', 'text', [
            'null' => true,
            'limit' => MysqlAdapter::TEXT_LONG,
        ]);
        $this->setColumn('tpl_html', 'text', [
            'null' => true,
            'limit' => MysqlAdapter::TEXT_LONG,
        ]);
        $this->setColumn('tpl_css', 'text', [
            'null' => true,
            'limit' => MysqlAdapter::TEXT_LONG,
        ]);
        $this->setColumn('tpl_date', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('tpl_date_edit', 'timestamp', [
            'null' => false,
            'update' => 'CURRENT_TIMESTAMP',
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('tpl_status', 'integer', [
            'null' => false,
            'default' => 2,
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
