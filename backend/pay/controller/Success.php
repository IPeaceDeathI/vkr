<?php

namespace Noks\Pay\Controller;

use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Model\FakeProduct;
use Noks\Model\FinanceModel;

class Success
{
    use TempAddCSSAddJSForHeadFooter;

    protected array $request = [];

    public function __invoke(): void
    {
        try {
            $this->process();
        } catch (\Throwable $e) {
            \_writeLog($e);
            \redirect('/admin/sites');
        }
    }

    // ------------------------------------------------------------------
    // 
    // ------------------------------------------------------------------

    protected function process(): void
    {
        $this->check();
        $this->request['InvId'] = \int($this->request['InvId']);
        $order_data = FinanceModel::self()->get($this->request['InvId']);
        if (!$order_data) \redirect('/admin/sites');
        $order_data['tariff'] = FakeProduct::self()->getById($order_data['finance_shp_product']);
        // --------------------------------------------------------------------------
        $this->view($order_data);
        exit();
    }

    protected function check(): void
    {
        $this->request = $_REQUEST;
        $this->request['id_flow'] = \getCurFlow();
        // --------------------------------------------------------------------------
        $v = \validation($this->request, [
            'id_flow' => 'required|integer',
            'InvId' => 'required|integer',
        ]);
        if ($v->getErrors()) \redirect('/admin/sites');
        $this->request = $v->getValidData();
    }

    protected function view($order_data): void
    {
        self::setResource();
        echo \obStartGetClean(function () use ($order_data) {
            $title = 'Оплата прошла успешно';
            include VERSION . '/head.php';
            include MAIN_DIR . '/pay/view/success.php';
            include VERSION . '/footer.php';
        });
    }
}
