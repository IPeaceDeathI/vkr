<?php

namespace Noks\Pay\Controller;

use Noks\Model\FinanceModel;
use Noks\Enum\StatusFinanceEnum;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Error\Errors;

class Fail
{
    use TempAddCSSAddJSForHeadFooter;

    protected array $request = [];

    public function __invoke(): void
    {
        try {
            $this->process();
        } catch (\Throwable $e) {
            \_writeLog($e);
            Errors::_500();
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    protected function process(): void
    {
        $this->check();

        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------

        $finance_id = \int($this->request['InvId']);
        $order_data = FinanceModel::self()->get($finance_id);
        if (!$order_data) \redirect('/admin/sites');

        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------

        $data_update = [];
        if (isset($this->request['PaymentMethod'])) {
            $data_update['finance_payment_method'] = $this->request['PaymentMethod'];
        }

        if (isset($this->request['IncCurrLabel'])) {
            $data_update['finance_curr_label'] = $this->request['IncCurrLabel'];
        }

        if (isset($this->request['EMail'])) {
            $data_update['finance_email'] = $this->request['EMail'];
        }

        if (isset($this->request['Fee'])) {
            $data_update['finance_fee'] = $this->request['Fee'];
        }

        if (isset($this->request['IsTest'])) {
            $data_update['finance_is_test'] = $this->request['IsTest'];
        }

        $data_update['finance_status'] = StatusFinanceEnum::FAIL->getStatus();

        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------

        FinanceModel::self()->_updateByCriteria(
            data: $data_update,
            where_in: [
                'finance_id' => [$finance_id]
            ]
        );
        if (FinanceModel::hasErrors()) {
            FinanceModel::pullErrors();
            \_writeLog([
                '$data_update' => $data_update,
                '$finance_id' => $finance_id,
                '$order_data' => $order_data,
            ]);
        }
        unset($data_update);

        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------

        $this->view($order_data);
        exit();
    }

    protected function check(): void
    {
        $this->request = $_REQUEST;
        $v = \validation($this->request, [
            'InvId' => 'required|integer',

            'PaymentMethod' => 'nullable',
            'IncCurrLabel'  => 'nullable',
            'EMail'         => 'nullable',
            'Fee'           => 'nullable',
            'IsTest'        => 'nullable',
        ]);
        if ($v->getErrors()) \redirect('/admin/sites');
        $this->request = $v->getValidData();
    }

    protected function view($order_data): void
    {
        self::setResource();
        echo \obStartGetClean(function () use ($order_data) {
            $title = 'Ошибка при оплате';
            include VERSION . '/head.php';
            include MAIN_DIR . '/pay/view/fail.php';
            include VERSION . '/footer.php';
        });
    }
}
