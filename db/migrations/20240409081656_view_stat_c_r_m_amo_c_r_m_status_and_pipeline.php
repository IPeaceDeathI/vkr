<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * 
 */
final class ViewStatCRMAmoCRMStatusAndPipeline extends NoksMigration
{
    public string $name = 'v_stat_crm_amocrm_status_and_pipeline';

    public function up(): void
    {
        $sql = 'SELECT
                `status`.id as status_id,
                `status`.`name` as s_name,
                `status`.created_at as s_created_at,
                `status`.updated_at as s_updated_at,

                `pipeline`.integration_id,

                `pipeline`.id as pipeline_id,
                `pipeline`.`name` as p_name,
                `pipeline`.is_archive as p_is_archive,
                `pipeline`.created_at as p_created_at,
                `pipeline`.updated_at as p_updated_at

            FROM `stat_crm_amocrm_status` AS `status`

            JOIN `stat_crm_amocrm_pipeline` AS `pipeline`
            ON `status`.`pipeline_id` = `pipeline`.`id`
        ';

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
