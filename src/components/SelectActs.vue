<template>
    <select ref="select" name="code" class="form-control" data-live-search="true" title="請選擇活動">
        <template v-for="item in acts">
            <optgroup v-bind:label="item.year+'&frasl;'+item.month">
                <option v-for="element in item.acts" v-bind:class="Date.parse(element.actDate) <= Date.now() ? 'bgc-grey-l1' : ''" 
                    v-bind:value="element.actCode"> {{ shortDate(element.actDate) }} &frasl; {{ element.actName }}
                </option>
            </optgroup>
        </template>

        <!-- <option v-for="item in acts" v-bind:class="Date.parse(item.date) <= Date.now() ? 'bgc-grey-l1' : ''" 
            v-bind:value="item.code"> {{ item.date }} &frasl; {{ item.name }}
        </option> -->
    </select>
</template>

<script>

import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select';
import moment from 'moment';

export default {
    props: ['acts'],
    updated() {
        $(this.$refs.select).selectpicker('refresh');
    },
    methods: {
        shortDate: function (value) {
            return moment(value).format('YYYY-MM-DD');
        }
    }
}
</script>