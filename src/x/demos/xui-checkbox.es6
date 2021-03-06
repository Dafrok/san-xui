/**
 * @file demos/xui-checkbox.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import {CheckBox, RadioBox, Switch} from 'san-xui';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="checked=true">
    <xui-checkbox checked="{=checkbox.checked=}" title="the label" />
    <xui-switch checked="{=checkbox.checked=}" />
    <xui-radiobox checked="{=checkbox.checked=}" title="the radiobox label" />
</x-row>
<x-row label="[default]checked=false">
    <xui-checkbox />
    <xui-checkbox disabled />
    <xui-radiobox disabled />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-switch': Switch,
        'xui-radiobox': RadioBox,
        'xui-checkbox': CheckBox
    },
    initData() {
        return {
            checkbox: {
                checked: true
            }
        };
    }
});
