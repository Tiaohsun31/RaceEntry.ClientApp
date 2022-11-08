<template>
    <select ref="select" name="code" class="form-control" data-live-search="true" title="請選擇活動">
        <option v-for="item in acts" v-bind:class="Date.parse(item.date) <= Date.now() ? 'bgc-grey-l1' : ''"
            v-bind:value="item.code"> {{ item.date }} &frasl; {{ item.name }}
        </option>
    </select>
</template>

<script>

import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select';

export default {
    props: ['acts'],
    updated() {
        $(this.$refs.select).selectpicker('refresh');
    }
}
</script>