<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class ViewSitePageAndConstructorPage extends NoksMigration
{
    public string $name = 'v_site_page_and_constructor_page';

    public function up(): void
    {
        $sql = 'SELECT
                sp.id AS site_page_id,
                sp.id_user_create AS user_id,
                sp.id_site AS site_id,
                sp.add_date_time AS created_at,
                sp.update_date_time AS updated_at,
                sp.uri,
                sp.hash_uri,
                sp.title,
                sp.description,
                sp.views,
                sp.preview_src,
                sp.status,
                sp.version_editor,
                
                cp.structure AS structure,
                cp.last_structure AS last_structure,
                cp.html AS html,
                cp.style AS style,
                cp.created_at AS page_created_at,
                cp.updated_at AS page_updated_at
            FROM `sites_pages` AS sp
            JOIN `constructor_pages` AS cp
            ON sp.id = cp.page_id';

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
