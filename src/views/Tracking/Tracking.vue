<template>
  <Layout>
    <img
      src="/眾點-網站版主視覺.png"
      alt="眾點-網站版主視覺"
      class="img-fluid"
    />

    <section id="tracking">
      <Form @submit="onSubmit">
        <div class="row-box">
          <div class="title col-form-label pr-0">
            <label for="tracking-act">活動場次</label>
          </div>
          <div class="input">
            <Field
              name="code"
              label="活動場次"
              rules="required"
              v-slot="{ field }"
              id="tracking-act"
            >
              <SearchFilter v-bind="field" position="Search"></SearchFilter>
            </Field>
            <ErrorMessage name="code" class="text-danger"></ErrorMessage>
          </div>
        </div>

        <div class="row-box">
          <div class="title col-form-label pr-0">
            <label for="tracking-order">訂單編號</label>
          </div>
          <div class="input">
            <Field
              name="orderId"
              label="訂單編號"
              rules="required"
              class="form-control"
              id="tracking-order"
            ></Field>
            <ErrorMessage
              name="orderId"
              class="text-danger"
              as="div"
            ></ErrorMessage>
          </div>
        </div>

        <div class="row-box">
          <div class="title col-form-label pr-0">
            <label for="tracking-phoneNumber">手機號碼</label>
          </div>
          <div class="input">
            <Field
              name="phoneNumber"
              label="手機號碼"
              rules="required"
              class="form-control"
              id="tracking-phoneNumber"
            ></Field>
            <ErrorMessage
              name="phoneNumber"
              class="text-danger"
              as="div"
            ></ErrorMessage>
          </div>
        </div>
        <div class="row-box">
          <div class="title"></div>
          <div class="input">
            <RouterLink :to="{ name: 'ForgotOrder' }">
              忘記訂單號碼
            </RouterLink>
          </div>
        </div>

        <div class="row-box">
          <div class="title"></div>
          <div class="input">
            <button
              type="submit"
              class="btn btn-primary btn-block px-4 btn-bold mt-2 mb-4"
            >
              查詢
            </button>
          </div>
        </div>
      </Form>
    </section>
  </Layout>
</template>

<script lang="js">
  import SearchFilter from '../../components/Layout/SearchFilter.vue';
  import { Field,ErrorMessage,Form } from 'vee-validate';
  import axios from 'axios';
  import Swal from 'sweetalert2';

  export default {
      name:'Tracking',
      components:{
          SearchFilter,
          Field,Form,ErrorMessage
      },
      methods:{
          onSubmit(values){
              const form = JSON.stringify(values,null,2);

              axios.post('/api/order/search',form,{
                  headers:{
                      'Content-Type':'application/json'
                  }
              }).then(({data}) => {
                  sessionStorage.setItem("orderId",data);
                  this.$router.push({name:'Checkout',params: { code: `${values.code}` }});
              }).catch((error) => {
                  if (error.response.status == 404) {
                      Swal.fire({icon:'error',title:'找不到資料'});
                  }
              });
          }
      }
  }
</script>

<style lang="scss" scoped>
  @import "@/scss/common";
  @import "@/scss/mixin";
  @import "@/scss/variable";

  #tracking {
    width: 100%;
    max-width: 600px;
    margin: 100px auto 100px;
    padding: 0 20px;

    .row-box {
      width: 100%;
      @include flex;
      margin-top: 20px;
      &:nth-child(1) {
        margin-top: 0;
      }

      @include bkpt(535px) {
        flex-direction: column;
      }
      .title {
        width: 100px;
        margin-right: 10px;

        @include bkpt(535px) {
            width: 100%;
            @include flex(flex-start,flex-start);
            margin-right: 0;
        }
      }

      .input {
        width: 100%;
      }
    }
  }
</style>
