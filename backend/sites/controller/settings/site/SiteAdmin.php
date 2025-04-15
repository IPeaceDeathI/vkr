<?php

namespace Noks\Site\Controller\Setting;

use Noks\Site\Controller\Setting\Site;

class SiteAdmin
{
    public function __invoke(): void
    {
        (new Site)->__invoke(\getCurSiteID());
    }
}
