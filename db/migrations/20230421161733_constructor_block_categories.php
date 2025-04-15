<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class ConstructorBlockCategories extends NoksMigration
{
    public string $name = 'constructor_block_categories';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['category_id'],
        'encoding' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ];

    public function up(): void
    {
        $this->setColumn('category_id', 'integer', [
            'signed' => false,
            'identity' => true,
            'null' => false,
        ]);
        $this->setColumn('category_name', 'string', [
            'limit' => 60,
            'null' => false,
        ]);
        $this->setColumn('category_position', 'integer', [
            'null' => false,
            'signed' => false,
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

        $rows = [
            [
                'category_id'    => 1,
                'category_name'  => 'Обложка',
                'category_position' => 10,

            ],
            [
                'category_id'    => 2,
                'category_name'  => 'О проекте',
                'category_position' => 20,
            ],
            [
                'category_id'    => 3,
                'category_name'  => 'Заголовок',
                'category_position' => 30,
            ],
            [
                'category_id'    => 4,
                'category_name'  => 'Текстовый блок',
                'category_position' => 40,
            ],
            [
                'category_id'    => 5,
                'category_name'  => 'Изображение',
                'category_position' => 50,
            ],
            [
                'category_id'    => 6,
                'category_name'  => 'Галерея',
                'category_position' => 80,
            ],
            [
                'category_id'    => 7,
                'category_name'  => 'Форма',
                'category_position' => 90,
            ],
            [
                'category_id'    => 8,
                'category_name'  => 'Кнопка',
                'category_position' => 100,
            ],
            [
                'category_id'    => 9,
                'category_name'  => 'Преимущества',
                'category_position' => 110,
            ],
            [
                'category_id'    => 10,
                'category_name'  => 'Колонки',
                'category_position' => 120,
            ],
            [
                'category_id'    => 11,
                'category_name'  => 'Меню',
                'category_position' => 60,
            ],
            [
                'category_id'    => 12,
                'category_name'  => 'Магазин',
                'category_position' => 130,
            ],
            [
                'category_id'    => 13,
                'category_name'  => 'Разделитель',
                'category_position' => 140,
            ],
            [
                'category_id'    => 14,
                'category_name'  => 'Список страниц',
                'category_position' => 150,
            ],
            [
                'category_id'    => 15,
                'category_name'  => 'Подвал',
                'category_position' => 70,
            ],
            [
                'category_id'    => 16,
                'category_name'  => 'Видео',
                'category_position' => 160,
            ],
            [
                'category_id'    => 17,
                'category_name'  => 'Команда',
                'category_position' => 170,
            ],
            [
                'category_id'    => 18,
                'category_name'  => 'Отзывы',
                'category_position' => 180,
            ],
            [
                'category_id'    => 19,
                'category_name'  => 'Расписание',
                'category_position' => 190,
            ],
            [
                'category_id'    => 20,
                'category_name'  => 'Этапы',
                'category_position' => 200,
            ],
            [
                'category_id'    => 21,
                'category_name'  => 'Контакты',
                'category_position' => 210,
            ],
            [
                'category_id'    => 22,
                'category_name'  => 'Услуги',
                'category_position' => 220,
            ],
            [
                'category_id'    => 23,
                'category_name'  => 'Соц. сети',
                'category_position' => 230,
            ],
            [
                'category_id'    => 24,
                'category_name'  => 'Тарифы',
                'category_position' => 240,
            ],
            [
                'category_id'    => 25,
                'category_name'  => 'Партнеры',
                'category_position' => 250,

            ],
            [
                'category_id'    => 26,
                'category_name'  => 'Списки',
                'category_position' => 270,
            ],
            [
                'category_id'    => 27,
                'category_name'  => 'Калькулятор',
                'category_position' => 270,
            ],
            [
                'category_id'    => 99,
                'category_name'  => 'Другое',
                'category_position' => 990,
            ],
        ];

        $table = $this->table($this->name);
        $table->insert($rows)->saveData();
    }
    public function down(): void
    {
        #$this->table('constructor_block_categories')->drop()->save();
    }
}
