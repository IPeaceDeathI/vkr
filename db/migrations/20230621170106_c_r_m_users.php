<?php
declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';
use Noks\Migration\NoksMigration;
use Phinx\Db\Adapter\MysqlAdapter;

final class CRMUsers extends NoksMigration
{
    public string $name = 'crm_users';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['user_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['user_token_id', 'user_source_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up (): void
    {
        $this->setColumn('user_id', 'integer', [
            'signed' => false,
            'identity' => true,
            'null' => false,
        ]);
        $this->setColumn('user_crm_id', 'integer', [
            'signed' => false,
            'null' => false,
            'comment' => 'идентификатор crm (enum)',
        ]);
        $this->setColumn('user_source_name', 'string', [
            'null' => false,
            'comment' => 'имя пользователя',
        ]);
        $this->setColumn('user_source_id', 'integer', [
            'signed' => false,
            'null' => false,
            'comment' => 'id пользователя',
        ]);
        $this->setColumn('user_token_id', 'integer', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('user_status', 'integer', [
            'signed' => false,
            'null' => false,
            'limit' => MysqlAdapter::INT_TINY,
            'default' => 1,
            'comment' => 'Статус пользователя актуальна/удален',
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