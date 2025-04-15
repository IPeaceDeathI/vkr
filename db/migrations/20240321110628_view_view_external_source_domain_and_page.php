<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\View\ViewViewExternalSourceDomainAndPageModel
 */
final class ViewViewExternalSourceDomainAndPage extends NoksMigration
{
    public string $name = 'v_view_external_source_domain_and_page';

    public function up(): void
    {
        $sql = 'SELECT
            `log_view`.*,
            `d`.`domain`,
            `d`.`show_name` as `domain_show_name`,
            `d`.`parent_id` as `domain_parent_id`,
            IF(`log_view`.`source_path_id` = 0, "/", `p`.`path`) as `path`
        FROM `log_view`

        JOIN `stat_external_source_domain` AS `d`
        ON `log_view`.source_domain_id = `d`.id

        LEFT JOIN `stat_external_source_path` AS `p`
        ON `log_view`.`source_path_id` = `p`.id
        ';

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
