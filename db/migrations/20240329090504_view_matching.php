<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * 
 */
final class ViewMatching extends NoksMigration
{
    public string $name = 'v_matching';

    public function up(): void
    {
        $sql = 'SELECT
            f.flow_id,
            u.user_id,
            s.id as site_id,
            sp.id as site_page_id,
            sd.id as site_domain_id,
            l.lead_id,
            quiz.quiz_id,
            form.form_id,
            stat.stat_id,
            si.id as integration_id
        FROM `flows` AS f

        -- Flow

        LEFT JOIN flow_to_user as f_to_u
        ON f_to_u.id_flow = f.flow_id

        -- user

        LEFT JOIN users as u
        ON u.user_id = f_to_u.id_user

        -- site and page

        LEFT JOIN sites as s
        ON f.flow_id = s.id_flow

        LEFT JOIN sites_pages as sp
        ON sp.id_site = s.id

        LEFT JOIN sites_domain as sd
        ON sd.id_site = s.id

        -- lead

        LEFT JOIN crm_leads as l
        ON l.lead_id_flow = f.flow_id

        -- quiz

        LEFT JOIN quiz
        ON quiz.quiz_id_flow = f.flow_id

        -- form

        LEFT JOIN form
        ON form.form_id_flow = f.flow_id

        -- Stat

        LEFT JOIN stat
        ON stat.flow_id = f.flow_id

        LEFT JOIN stat_integration as si
        ON si.stat_id = stat.stat_id
        ';

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
