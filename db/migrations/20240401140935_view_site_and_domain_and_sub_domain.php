<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * 
 */
final class ViewSiteAndDomainAndSubDomain extends NoksMigration
{
    public string $name = 'v_site_domain_sub_domain';

    public function up(): void
    {
        $sql = 'SELECT
                s.*,
                d.id as domain_id,
                d.domain,
                sd.sub_domain
            FROM `sites` AS s

            LEFT JOIN `sites_domain` AS d
            ON s.id = d.id_site

            LEFT JOIN `sub_domain_site` AS sd
            ON s.id = sd.site_id;
        ';

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
