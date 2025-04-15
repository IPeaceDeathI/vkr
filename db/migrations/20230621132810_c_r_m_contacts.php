<?php
declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';
use Noks\Migration\NoksMigration;
use Phinx\Db\Adapter\MysqlAdapter;

final class CRMContacts extends NoksMigration
{
    public string $name = 'crm_contacts';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['contact_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['contact_token_id', 'contact_source_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up (): void
    {
        $this->setColumn('contact_id', 'integer', [
            'signed' => false,
            'identity' => true,
            'null' => false,
        ]);
        $this->setColumn('contact_crm_id', 'integer', [
            'signed' => false,
            'null' => false,
            'comment' => 'идентификатор crm (enum)',
        ]);
        $this->setColumn('contact_source_name', 'string', [
            'null' => false,
            'comment' => 'имя контакта',
        ]);
        $this->setColumn('contact_source_id', 'integer', [
            'signed' => false,
            'null' => false,
            'comment' => 'id контакта',
        ]);
        $this->setColumn('contact_token_id', 'integer', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('contact_status', 'integer', [
            'signed' => false,
            'null' => false,
            'limit' => MysqlAdapter::INT_TINY,
            'default' => 1,
            'comment' => 'Статус контакта актуальна/удален',
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