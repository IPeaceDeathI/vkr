<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class ViewConstructor2TemplateAndCategory extends NoksMigration
{
    public string $name = 'v_constructor2_template_and_category';

    public function up(): void
    {
        $sql = 'SELECT

            t.template_id,
            t.user_id,
            t.flow_id,
            t.status,
            t.name,
            t.preview_url,
            t.structure,
            t.last_structure,
            t.created_at as template_created_at,
            t.updated_at as template_updated_at,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    "category_id", c.category_id,
                    "name", c.name,
                    "created_at", c.created_at,
                    "updated_at", c.updated_at
                )
            ) AS categories

        FROM `constructor2_template` AS t

        JOIN constructor2_template_link AS tl
        ON t.template_id = tl.template_id

        JOIN constructor2_template_category AS c
        ON tl.category_id = c.category_id

        GROUP BY t.template_id
        ';

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
