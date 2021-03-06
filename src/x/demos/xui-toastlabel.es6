/**
 * @file demos/xui-toastlabel.es6
 * @author leeight
 */

import _ from 'inf-i18n';
import {defineComponent} from 'san';
import {ToastLabel} from 'san-xui';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]level=alert">
    <xui-toastlabel text="hello toastlabel" />
</x-row>
<x-row label="level=normal">
    <xui-toastlabel text="{{'预付费'| i18n}} i18n" level="normal" />
</x-row>
<x-row label="level=error">
    <xui-toastlabel text="{{aaa}}, i18n" level="error" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel
    },
    initData() {
        return {
            aaa: _('预付费')
        };
    }
});
