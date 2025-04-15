<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class QuizResults extends NoksMigration
{
    public string $name = 'quiz_results';

    public array $settingTable = [
        'id' => false,
        'primary_key' => ['result_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        // [
        //     'columns' => [''],
        //     'options' => [],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('result_id', 'int', [
            'null' => false,
            'signed' => false,
            'identity' => true,
        ]);
        $this->setColumn('result_approach_hash', 'varchar', [
            'null' => false,
        ]);
        $this->setColumn('result_quiz_id', 'int', [
            'null' => false,
        ]);
        $this->setColumn('result_session_id', 'varchar', [
            'limit' => 1000
        ]);
        $this->setColumn('result_question', 'varchar', [
            'limit' => 1000
        ]);
        $this->setColumn('result_answer', 'text', []);
        $this->setColumn('result_lead_id', 'int', []);
        $this->setColumn('result_create_time', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
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

// старая структура таблицы, изменено: 27.09.2023
// $sql = 'CREATE TABLE `quiz_results` (
//             `result_id` int unsigned NOT NULL AUTO_INCREMENT,
//             `result_approach_hash` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
//             `result_quiz_id` int unsigned NOT NULL,
//             `result_session_id` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
//             `result_question` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
//             `result_answer` json DEFAULT NULL,
//             `result_lead_id` int unsigned DEFAULT NULL,
//             `result_create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
//             PRIMARY KEY (`result_id`) USING BTREE,
//             KEY `index1` (`result_approach_hash`,`result_question`) USING BTREE
//           ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
//         ';