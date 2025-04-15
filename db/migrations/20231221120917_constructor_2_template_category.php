<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class Constructor2TemplateCategory extends NoksMigration
{
    public string $name = 'constructor2_template_category';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['category_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        // [
        //     'columns' => [''],
        //     'options' => [
        //         'unique' => true,
        //     ],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('category_id', 'int', [
            'signed' => false,
            'null' => false,
        ]);
        $this->setColumn('name', 'varchar', [
            'null' => false,
        ]);
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

        $rows = [
            [
                'category_id'    => 1,
                'name'  => 'Интернет-магазин',
            ],
            [
                'category_id'    => 2,
                'name'  => 'Услуги',
            ],
            [
                'category_id'    => 3,
                'name'  => 'Курсы и обучение',
            ],
            [
                'category_id'    => 4,
                'name'  => 'Ремонт',
            ],
            [
                'category_id'    => 5,
                'name'  => 'Мебель',
            ],
            [
                'category_id'    => 6,
                'name'  => 'Авто',
            ],
            [
                'category_id'    => 7,
                'name'  => 'Красота и здоровье',
            ],
            [
                'category_id'    => 8,
                'name'  => 'Портфолио',
            ],
            [
                'category_id'    => 9,
                'name'  => 'Строительство',
            ],
            [
                'category_id'    => 10,
                'name'  => 'Грузоперевозки',
            ],
            [
                'category_id'    => 11,
                'name'  => 'Автоворонка',
            ],
            [
                'category_id'    => 12,
                'name'  => 'Доставка еды',
            ],
            [
                'category_id'    => 13,
                'name'  => 'Вебинары',
            ],
        ];
        $table = $this->table($this->name);
        $table->insert($rows)->saveData();
    }

    public function down(): void
    {
        // $this->table($this->name)->drop()->save();
    }
}
