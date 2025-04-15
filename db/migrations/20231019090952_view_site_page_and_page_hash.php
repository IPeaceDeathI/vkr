<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class ViewSitePageAndPageHash extends NoksMigration
{
    public string $name = 'v_site_page_and_page_hash';

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
                
                ph.hash_text AS structure,
                null AS last_structure,
                ph.hash_html AS html,
                ph.hash_styles AS style,
                ph.hash_date AS page_created_at,
                ph.hash_update_date AS page_updated_at
            FROM `sites_pages` AS sp
            JOIN `pages_hash` AS ph
            ON sp.id = ph.hash_page';

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
