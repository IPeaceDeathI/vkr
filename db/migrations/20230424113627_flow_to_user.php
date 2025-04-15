<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class FlowToUser extends AbstractMigration
{
    public string $name = 'flow_to_user';

    public function up(): void
    {
        if ($this->hasTable($this->name)) return;

        $sql = 'CREATE TABLE `flow_to_user` (
            `id_flow` int NOT NULL,
            `id_user` int NOT NULL,
            UNIQUE KEY `id_flow` (`id_flow`,`id_user`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ';

        $this->execute($sql);

        // дефолтный проект для дефолтного пользователя
        $sql = 'INSERT INTO flow_to_user SET id_flow=1, id_user=1';
        $this->execute($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
