<?php

namespace Noks\Constructor\Show;

use Noks\Model\SitePage;

Class SiteClient
{
    static private string $uri;
    static string $host;

    static private function definePage ():void
    {
        self::$uri = trim(self::$uri, '/');
        $tmp = explode('?', self::$uri);
        self::$uri = current($tmp);
    }

    static function getPage (int $id_site, string $uri):array
    {
        self::$uri = $uri;
        self::definePage();
        return SitePage::getByIdSiteAndURI($id_site, self::$uri);
    }
}