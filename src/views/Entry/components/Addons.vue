<template>
    <div v-if="selectedAddons.length > 0" class="card-body pt-3">
        <div class="my-3">
            <h5 class="text-120 text-grey-d3">
                <i class="fa fa-star mr-1 text-orange text-90"></i>
                加購明細
            </h5>
            <ul class="list-group">
                <li v-for="item in selectedAddons" :key="item.productId"
                    class="list-group-item d-flex justify-content-between align-items-center">
                    {{ item.name + (item.spec == null || item.spec == "" ? "" : `／${item.spec}`) + ' * ' + item.qty }}
                    <button type="button" class="close" aria-label="Close" v-on:click="removeCart(item)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    <div v-if="addons != null && addons.length > 0" class="card-body pt-3">
        <div class="row text-600 text-95 text-secondary-d3 bgc-grey-l4 py-25 border-y-2">
            <div class="d-none d-sm-block col-2"> </div>
            <div class="col-12 col-sm-4"> 商品名稱與描述 </div>
            <div class="col-sm-2 d-none d-sm-block"> 單價 </div>
            <div class="col-sm-2 d-none d-sm-block"> 規格 </div>
            <div class="col-sm-2 d-none d-sm-block"> 數量 </div>
        </div>
        <div class="text-95 text-dark-m3">
            <div class="row pb-2 mb-sm-0 py-sm-2 border-b-1 brc-secondary-l3 align-items-center"
                v-for="element in addons">
                <div class="d-none d-sm-block col-2">
                    <img v-show="element.thumbnail" class="radius-1 mb-1 mb-sm-0 mr-3" v-bind:alt="element.name"
                        style="width: 100px; height: 100px;" v-bind:src="element.thumbnail">
                </div>
    
                <div class="col-12 col-sm-4 px-0">
                    <div class="d-block d-sm-none text-center py-25 bgc-blue-l3 border-b-1 brc-secondary-l3">
                        <a v-if="element.images" href="#" class="btn-text-dark btn-h-text-primary"
                            v-on:click.prevent="showImages(element.productId)">
                            {{element.name}} <i class="far fa-image w-2"></i>
                        </a>
                        <span v-else v-text="element.name"></span>
                        <span v-if="element.label" class="badge bgc-pink text-white text-xs ml-1"
                            v-text="element.label"></span>
                    </div>
                    <div class="d-none d-sm-inline-block text-120">
                        <a v-if="element.images" href="#" class="btn-text-dark btn-h-text-primary"
                            v-on:click.prevent="showImages(element.productId)">
                            {{element.name}} <i class="far fa-image w-2"></i>
                        </a>
                        <span v-else v-text="element.name"></span>
                        <span v-if="element.label" class="badge bgc-pink text-white text-xs ml-2"
                            v-text="element.label"></span>
                    </div>
                    <div class="mt-1 d-none d-sm-block" v-text="element.description"></div>
                </div>
    
                <div class="col-sm-2 col-4 mt-2" v-text="'NT$'+element.unitPrice"></div>
    
                <div class="col-sm-2 col-4 mt-2">
                    <div v-if="element.spec !== null && element.spec.length > 0">
                        <input type="hidden" v-bind:value="element.name">
                        <template v-if="element.spec.length == 1">
                            <select v-bind:id="'addonsSpecs'+element.productId" class="form-control"
                                v-on:change="resetQty(element.ProductId)">
                                <option value="" disabled hidden selected> -- 請選擇 -- </option>
                                <option v-for="option in element.spec[0].list" v-bind:disabled="option.disabled"
                                    v-bind:value="(option.name || option.title)">
                                    {{ option.name || option.title }}
                                    {{ option.disabled ? "已售完" : "" }}
                                </option>
                            </select>
                        </template>
                        <template v-else>
                            <select v-bind:id="'addonsSpecs'+element.productId" class="form-control"
                                v-on:change="resetQty(element.productId)">
                                <option value="" disabled hidden selected> -- 請選擇 -- </option>
                                <optgroup v-for="options in element.spec"
                                    v-bind:label="options.key == null ? '' : options.key">
                                    <option v-for="item in options.list" v-bind:disabled="item.disabled"
                                        v-bind:value="item.title != '' && item.name != '' ? `${item.title}-${item.name}` : `${item.title}${item.name}`">
                                        {{ item.name || item.title }}
                                        {{ item.disabled ? "已售完" : "" }}
                                    </option>
                                </optgroup>
                            </select>
                        </template>
                    </div>
                </div>
                <div class="col-sm-2 col-4 mt-2">
                    <select class="form-control" v-bind:id="'addonsQty'+element.productId"
                        v-on:change="addCart($event.target,element)">
                        <option value="0">0</option>
                        <option v-bind:value="n" v-for="n in element.limitQty" v-text="n"></option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    name: 'Addons',
    props: {
        addons: Array,
        selectedAddons: Array,
    },
    emits: ['changeCart'],
    data() {
        return {
            addonsIsModify:false
        }
    },
    methods: {
        resetQty(productId) {
            $('#addonsQty' + productId).val(0);
        },
        addCart: function (target, element) {
            
            let selectedQty = $('#' + target.id + " :selected").val();
            let addons = {
                productId: element.productId,
                name: element.name,
                qty: selectedQty,
                spec: ""
            };

            if (element.spec.length > 0) {
                let selectedSpec = $('#addonsSpecs' + element.productId + " :selected").val();
                if (selectedSpec == "") {
                    $('#' + target.id).val(0);
                    Swal.fire({ icon: 'warning', text: `請先選擇 ${element.name} 規格` });
                    return;
                } else {
                    addons.spec = selectedSpec;
                }
            };
            let findCart = this.findCart(addons.productId, addons.spec);
            if (findCart == -1) {
                if (selectedQty > 0) this.selectedAddons.push(addons);
            } else {
                if (selectedQty == 0) {
                    this.removeCart(addons);
                } else {
                    this.selectedAddons[findCart].qty = selectedQty;
                }
            }
            this.addonsIsModify = true;
            this.$emit('changeCart',this.selectedAddons,this.addonsIsModify);
        },
        findCart: function (productId, spec) {
            if (spec != "") {
                return this.selectedAddons.findIndex(x => x.productId == productId && x.spec == spec);
            }
            return this.selectedAddons.findIndex(x => x.productId == productId);
        },
        removeCart: function (element) {
            let findCart = this.findCart(element.productId, element.spec);
            if (findCart != -1) {
                this.selectedAddons.splice(findCart, 1);
                this.addonsIsModify = true;
                this.$emit('changeCart',this.selectedAddons,this.addonsIsModify);
            };
        },
        showImages: function (productId) {
            let product = this.addons.find(x => x.productId == productId);
            
            if (product.images == '') return;
            if (product != '') {
                let modal = $('#productModal');
                modal.modal('show');
                modal.find('.modal-title').text(product.name);
                modal.find('.modal-body').empty();
            
                $.each(product.images?.split(','), function (i, item) {
                    $('#productModal').find('.modal-body').append(
                        $('<img>', { src: item, alt: product.Name, class: "img-fluid" })
                    );
                });
            }
        },
    }
}
</script>