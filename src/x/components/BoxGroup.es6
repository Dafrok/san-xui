/**
 * @file components/BoxGroup.es6
 * @author leeight
 */

import _ from 'lodash';
import {DataTypes, defineComponent} from 'san';

import {nexUuid, create} from './util';
import {asInput} from './asInput';

const cx = create('ui-boxgroup');

/* eslint-disable */
const template = `
<template>
<div class="{{mainClass}}">
    <div class="${cx('group')}" s-for="ds, i in groupedDatasource">
        <label class="${cx('radio', 'wrapper')}" san-for="item in ds">
            <input san-if="boxType == 'radio'"
                type="radio"
                on-change="onChange($event, item.__index)"
                name="{{name}}"
                disabled="{{item.disabled || disabled}}"
                checked="{{checkedStatus[item.__index]}}"
            />
            <input san-else
                type="checkbox"
                on-change="onChange($event, item.__index)"
                name="{{name}}"
                disabled="{{item.disabled || disabled}}"
                checked="{{checkedStatus[item.__index]}}"
            />
            <span>{{item | title}}</span>
        </label>
    </div>
</div>
</template>
`;
/* eslint-enable */

const BoxGroup = defineComponent({
    template,
    initData() {
        return {
            datasource: [], // Array.<{value: string, title: string}>
            disabled: false,
            orientation: 'horizontal', // 'vertical' | 'horizontal'
            value: null,
            colCount: 0, // 展示N列
            name: 'esui' + nexUuid(),
            boxType: 'radio' // 'radio' | 'checkbox'
        };
    },
    dataTypes: {
        datasource: DataTypes.array,
        disabled: DataTypes.bool,
        orientation: DataTypes.string,
        value: DataTypes.any,
        colCount: DataTypes.number,
        boxType: DataTypes.string
    },
    computed: {
        checkedStatus() {
            const status = {};
            const datasource = this.data.get('datasource');
            const boxType = this.data.get('boxType');

            let value = this.data.get('value');
            if (value != null) {
                if (boxType === 'radio' && !_.isArray(value)) {
                    value = [value];
                }

                for (let i = 0; i < value.length; i++) {
                    for (let j = 0; j < datasource.length; j++) {
                        if (datasource[j].value === value[i]) {
                            status[j] = 1;
                            break;
                        }
                    }
                }
            }

            return status;
        },
        groupedDatasource() {
            const datasource = this.data.get('datasource');
            const colCount = this.data.get('colCount');
            if (!colCount) {
                return [_.map(datasource, (item, __index) => {
                    const {text, title, disabled} = item;
                    return {
                        text, title, disabled, __index
                    };
                })];
            }
            const itemsCount = datasource.length;
            const groups = [];
            const groupCount = Math.ceil(itemsCount / colCount);

            for (let i = 0; i < groupCount; i++) {
                const group = [];
                const startIndex = i * colCount;
                const endIndex = Math.min(itemsCount, (i + 1) * colCount);
                for (let j = startIndex; j < endIndex; j++) {
                    const {text, title, disabled} = datasource[j];
                    group.push({text, title, disabled, __index: j});
                }
                groups.push(group);
            }

            return groups;
        },
        mainClass() {
            const klass = cx.mainClass(this);
            const orientation = this.data.get('orientation');
            if (orientation) {
                klass.push(cx(orientation));
                klass.push('state-' + orientation);
            }
            return klass;
        }
    },
    filters: {
        title(item) {
            return item.text || item.title;
        }
    },
    inited() {
        const {boxType, value, disabled} = this.data.get();
        if (disabled === '') {
            this.data.set('disabled', true);
        }
        if (boxType === 'radio' && _.isArray(value)) {
            this.data.set('value', value[0]);
        }
        if (boxType === 'checkbox' && !value) {
            this.data.set('value', []);
        }
        this.watch('value', value => this.fire('change', {value}));
    },
    onChange(e, index) {
        const boxType = this.data.get('boxType');
        const datasource = this.data.get('datasource');

        const value = datasource[index].value;
        if (boxType === 'radio') {
            if (e.target.checked) {
                this.data.set('value', value);
            }
            else {
                // ??? 好像不太可能？
            }
        }
        else {
            if (e.target.checked) {
                this.data.push('value', value);
            }
            else {
                const valueIndex = _.findIndex(this.data.get('value'), o => o === value);
                if (valueIndex !== -1) {
                    this.data.removeAt('value', valueIndex);
                }
            }
        }
    }
});

export default asInput(BoxGroup);
