/**
 * @file RadioSelect.es6
 * @author leeight
 */
import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-radioselect');
const cx2 = create('ui-radio');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ul>
        <li on-click="onItemClick(item)"
            class="{{item | itemClass(value)}}"
            s-for="item in datasource">
          <div class="${cx2('item-hover')}" s-if="item.tip">{{item.tip}}<br/></div>
          <div class="arrow-down" s-if="item.tip"><i></i></div>
          {{item.text}}
        </li>
    </ul>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    filters: {
        itemClass(item, value) {
            const klass = [cx2('block')];

            if (item.disabled) {
                klass.push(cx2('disabled'));
            }

            if (item.value === value) {
                klass.push(cx2('selected'));
            }

            return klass;
        }
    },
    initData() {
        return {
            value: null,
            // TODO(leeight) 暂不支持 tip
            datasource: []
        };
    },
    onItemClick(item) {
        const disabled = this.data.get('disabled');
        if (item.disabled || disabled) {
            return;
        }
        this.data.set('value', item.value);
        this.fire('change', item);
    }
});


