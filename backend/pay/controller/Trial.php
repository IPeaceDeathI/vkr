<?php

namespace Noks\Pay\Controller;

use Noks\Model\Tariff;
use Noks\Model\LogBalanceModel;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\LogBalanceEnum;
use Noks\Helper\DateTime;
use Noks\Model\FakeProduct;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Model\EntityRightsLinkModel;
use Throwable;
use Noks\Error\Errors;
use Noks\BasicController;

class Trial extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    private $id_flow;

    // TODO сделать проверку продукта на enable и переписать под api
    public function __invoke()
    {
        try {
            $this->id_flow = \getCurFlow();
            $this->procces_main();
        } catch (Throwable $e) {
            \_writeLog($e);
            Errors::_500();
        }
    }

    function procces_main()
    {
        if (Tariff::checkActiveTrial($this->id_flow) || Tariff::checkFullyUsedTrial($this->id_flow)) {
            $this->viewUse();
            exit();
        }

        $data = [];
        $start = \time();
        $data_trial = FakeProduct::self()->getById(FakeProduct::TRIAL);
        $end = ($start + (DateTime::$day * $data_trial['days']));

        $data['tariff_flow_id']     = $this->id_flow;
        $data['tariff_trial_start'] = DateTime::unixToTimestamp($start);
        $data['tariff_trial_end']   = DateTime::unixToTimestamp($end);
        // в случаи если пользователь решил перейти с платного тарифа на пробный:
        $data['tariff_id']         = null;
        $data['tariff_status']     = null;
        $data['tariff_activation'] = null;
        $data['tariff_blocking']   = null;
        $data['tariff_last_write_off'] = null;

        $err = [];
        $res_tran = Tariff::commitCallBack(function () use ($data, &$err) {
            // ставим временные метки
            Tariff::update($data);
            if (Tariff::hasErrors()) {
                $err = Tariff::getErrors();
                $code = $this->log($err);
                $err[] = $code;
                \throwException();
            }

            // лог
            LogBalanceModel::self()->create($this->id_flow, LogBalanceEnum::TEST);

            // перед тем как дать права тарифа, убираем все другие права тарифа
            EntityRightsLinkModel::self()->removeAllTariffRightsByEntityID($this->id_flow, EntityTypeEnum::FLOW);
            // ставим тарифные права
            EntityRightsLinkModel::self()->add(
                FakeProduct::self()->getRightsByIdTariff(FakeProduct::TRIAL),
                $this->id_flow,
                EntityTypeEnum::FLOW
            );
            if (EntityRightsLinkModel::hasErrors()) {
                $err = EntityRightsLinkModel::pullErrors();
                $code = $this->log($err);
                $err[] = $code;
                \throwException();
            }
        });

        $err = [...$err, ...$res_tran];
        if ($err) {
            \session()->put('errors', $err);
            \redirect('/pay/error');
        }

        $this->view();
        exit();
    }

    private function view()
    {
        self::setResource();
        $title = 'Пробный тариф';
        include VERSION . '/head.php';
        include MAIN_DIR . '/pay/view/trial.php';
        include VERSION . '/footer.php';
    }

    private function viewUse()
    {
        self::setResource();
        $title = 'Пробный тариф';
        include VERSION . '/head.php';
        include MAIN_DIR . '/pay/view/trialUse.php';
        include VERSION . '/footer.php';
    }
}
