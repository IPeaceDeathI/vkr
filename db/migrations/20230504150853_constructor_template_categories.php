<?php
declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';
use Noks\Migration\NoksMigration;

final class ConstructorTemplateCategories extends NoksMigration
{
    public string $name = 'constructor_template_categories';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['category_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public function up (): void
    {
        $this->setColumn('category_id', 'integer', [
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('category_name', 'string', [
            'null' => false,
            'limit' => 100,
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

        $rows = [
            [
                'category_id'    => 1,
                'category_name'  => 'Интернет-магазин',
            ],
            [
                'category_id'    => 2,
                'category_name'  => 'Услуги',
            ],
            [
                'category_id'    => 3,
                'category_name'  => 'Курсы и обучение',
            ],
            [
                'category_id'    => 4,
                'category_name'  => 'Ремонт',
            ],
            [
                'category_id'    => 5,
                'category_name'  => 'Мебель',
            ],
            [
                'category_id'    => 6,
                'category_name'  => 'Авто',
            ],
            [
                'category_id'    => 7,
                'category_name'  => 'Красота и здоровье',
            ],
            [
                'category_id'    => 8,
                'category_name'  => 'Портфолио',
            ],
            [
                'category_id'    => 9,
                'category_name'  => 'Строительство',
            ],
            [
                'category_id'    => 10,
                'category_name'  => 'Грузоперевозки',
            ],
            [
                'category_id'    => 11,
                'category_name'  => 'Автоворонка',
            ],
            [
                'category_id'    => 12,
                'category_name'  => 'Доставка еды',
            ],
            [
                'category_id'    => 13,
                'category_name'  => 'Вебинары',
            ],
        ];

        $table = $this->table($this->name);
        $table->insert($rows)->saveData();
    }

    public function down (): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
