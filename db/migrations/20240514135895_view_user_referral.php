<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\View\ViewUserReferralModel
 */
final class ViewUserReferral extends NoksMigration
{
    public string $name = 'v_user_and_referral';

    public function up(): void
    {
        $sql = "SELECT
            
            u.*,
            r.hash_code as ref_hash_code,
            r.code as ref_code

        FROM users as u
        LEFT JOIN user_referral as r
        ON u.user_id = r.user_id
        ";

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
