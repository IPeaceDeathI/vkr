<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\UserReferralModel
 */
final class UserReferral extends NoksMigration
{
    public string $name = 'user_referral';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['user_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['code'],
            'options' => [
                'unique' => true,
            ],
        ],
        // [
        //     'columns' => ['user_id'],
        //     'options' => [
        //         'unique' => true,
        //     ],
        // ],
    ];

    public function up(): void
    {
        $this->setColumn('user_id', 'int', [
            'null'     => false,
            'signed'   => false,
        ]);
        $this->setColumn('hash_code', 'int', [
            'null'   => false,
            'signed' => false,
            'limit'  => 10,
        ]);
        $this->setColumn('code', 'varchar', [
            'null'  => false,
            'limit' => 10,
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
    }

    public function down(): void
    {
        // $this->table($this->name)->drop()->save();
    }
}
