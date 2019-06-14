<?php
/**
 * 平台首页
 */
class home extends TMS_CONTROLLER {

    public function get_access_rule() {
        $rule_action['rule_type'] = 'black';
        $rule_action['actions'] = array();

        return $rule_action;
    }
    /**
     *
     */
    public function index_action() {
        //$out = ob_get_contents();
        $str = file_get_contents(TMS_APP_DIR . '/views/default/index.html');
        echo $str;
        exit;
    }
    /**
     *
     */
    public function status_action() {
        return new \ResponseData('ok');
    }
    /**
     *
     */
    public function content_action() {
        return new \ResponseData('ok');
    }
    /**
     *
     */
    public function component_action() {
        return new \ResponseData(['template' => '<div>后端指定的组件模版</div>']);
    }
}