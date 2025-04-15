<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\YesNoEnum;

final class StatCRMAmoCRMSetting extends NoksMigration
{
    public string $name = 'stat_crm_amocrm_setting';
    public array $settingTable = [
        'id' => false,
        // 'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['integration_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('integration_id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        // ------------------------------------------------------------------
        $this->setColumn('filter', 'int', [
            'null' => true,
            'comment' => 'field_id Поле для фильтрации',
        ]);
        $this->setColumn('filtering_value', 'varchar', [
            'null' => true,
            'comment' => 'Значение фильтрации',
        ]);
        $this->setColumn('revenue', 'int', [
            'null' => true,
            'comment' => 'field_id Поле с выручкой',
        ]);
        $this->setColumn('cost', 'int', [
            'null' => true,
            'comment' => 'field_id Поле себестоимости',
        ]);
        $this->setColumn('profit', 'int', [
            'null' => true,
            'comment' => 'field_id Поле с прибылью',
        ]);


        $this->setColumn('send_leads_to_unsorted', 'tinyint', [
            'null' => true,
            'signed' => false,
            'comment' => YesNoEnum::class . ' Отправлять лиды в Неразобранное',
        ]);
        $this->setColumn('use_date_of_sale', 'tinyint', [
            'null' => true,
            'signed' => false,
            'comment' => YesNoEnum::class . ' Использовать дату продажи из CRM',
        ]);
        $this->setColumn('use_companies_as_client', 'tinyint', [
            'null' => true,
            'signed' => false,
            'comment' => YesNoEnum::class . ' Использовать компании как клиента',
        ]);
        $this->setColumn('manager_for_deal_if_contact_found', 'tinyint', [
            'null' => true,
            'signed' => false,
            'comment' => YesNoEnum::class . ' Если был найден контакт, то назначать ответственным за сделку менеджера, который ответственный за контакт',
        ]);


        $this->setColumn('form_id', 'varchar', [
            'null' => true,
            'comment' => 'Идентификатор формы',
        ]);
        $this->setColumn('form_name', 'varchar', [
            'null' => true,
            'comment' => 'Наименование формы',
        ]);
        $this->setColumn('pipeline_id', 'int', [
            'null' => true,
            'signed' => false,
        ]);
        $this->setColumn('responsible_user_id', 'int', [
            'null' => true,
            'signed' => false,
        ]);
        // ------------------------------------------------------------------
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