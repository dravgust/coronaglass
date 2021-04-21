<template>
    <div class="kt-container kt-grid kt-grid--ver">
        <div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">

            <div class="kt-subheader   kt-grid__item" id="kt_subheader">
                <div class="kt-container">
                    <div class="kt-subheader__main">
                        <h3 class="kt-subheader__title">
                            Certificate
                        </h3>
                        <span class="kt-subheader__separator kt-hidden"></span>
                        <div class="kt-subheader__breadcrumbs">
                            <a href="#" class="kt-subheader__breadcrumbs-home"><i class="flaticon-interface-11"></i></a>
                            <span class="kt-subheader__breadcrumbs-separator"></span>
                            <a href="" class="kt-subheader__breadcrumbs-link">
                                Customers
                            </a>
                            <!--<span class="kt-subheader__breadcrumbs-separator"></span>
                            <a href="" class="kt-subheader__breadcrumbs-link">
                                Customer
                            </a>-->

                            <!-- <span class="kt-subheader__breadcrumbs-link kt-subheader__breadcrumbs-link--active">Active link</span> -->
                        </div>
                    </div>
                    <div class="kt-subheader__toolbar">
                        <div class="kt-subheader__wrapper">

                        </div>
                    </div>
                </div>
            </div>

            <div class="kt-container kt-padding-0-mobile kt-grid__item kt-grid__item--fluid">
                <div class="row row-no-padding animate__animated animate__faster" v-show="!form.result"  v-bind:class="{animate__zoomOut: form.result }">
                    <div class="col-lg-12">
                        <!--end::Portlet-->
                        <!--begin::Portlet-->
                        <div class="kt-portlet">
                            <div class="kt-portlet__head">
                                <div class="kt-portlet__head-label">
                                    <h3 class="kt-portlet__head-title">
                                    </h3>
                                </div>

                                <div class="kt-portlet__head-toolbar">

                                </div>
                            </div>
                            <form class="kt-form kt-form--label-right">
                                <div class="kt-portlet__body">
                                    <div class="form-group form-group-last">
                                        <div class="alert alert-secondary" role="alert">
                                            <div class="alert-icon"><i class="flaticon-warning kt-font-brand"></i></div>
                                            <div class="alert-text">
                                                Please fill out the form with your personal data.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="kt-space-20"></div>

                                    <div class="form-group row">
                                        <label class="col-md-2 kt-hidden-mobile col-form-label">First Name</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" placeholder="First Name" required v-model="form.firstName">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-2 kt-hidden-mobile col-form-label">Last Name</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" placeholder="Last Name" required v-model="form.lastName">
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="example-password-input" class="col-md-2 kt-hidden-mobile col-form-label">Phone</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="la la-phone"></i>
                                                    </span>
                                                </div>
                                                <input class="form-control form-control-danger" placeholder="Phone" type="tel" required v-model="form.phone">
                                            </div>

                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="example-password-input" class="col-md-2 kt-hidden-mobile col-form-label">Email</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="la la-envelope"></i>
                                                    </span>
                                                </div>
                                                <input class="form-control form-control-danger" placeholder="Email" type="email" required v-model="form.email">
                                            </div>

                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="example-password-input" class="col-md-2 kt-hidden-mobile col-form-label">Address</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="la la-home"></i>
                                                    </span>
                                                </div>
                                                <input class="form-control" type="text" placeholder="Address" required v-model="form.address">
                                            </div>

                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="example-password-input" class="col-md-2 kt-hidden-mobile col-form-label">Project Name</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" placeholder="Project Name" v-model="form.projectName">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="example-password-input" class="col-md-2 kt-hidden-mobile col-form-label">Constructor</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" required placeholder="Constructor" v-model="form.constructor">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="example-date-input" class="col-md-2 col-sm-12col-form-label">Key Received</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="date" min="2020-01-01" v-model="form.keyReceived">
                                        </div>
                                    </div>

                                </div>
                                <div class="kt-portlet__foot">
                                    <div class="kt-form__actions">
                                        <div class="row">
                                            <div class="col-2">
                                            </div>
                                            <div class="col-10">
                                                <button type="reset" class="btn btn-primary btn-elevate mr-1" @click.prevent="submit">Submit</button>
                                                <!--<button type="reset" class="btn btn-secondary">Cancel</button>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <!--end::Portlet-->
                    </div>
                </div>
                <div class="row row-no-padding">
                    <div class="kt-portlet">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <!--<span class="kt-portlet__head-icon">
                                    <i class="la la-puzzle-piece"></i>
                                </span>
                                <h3 class="kt-portlet__head-title">
                                   
                                </h3>-->
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <div class="kt-pricing-1 kt-pricing-1--fixed">
                                <div class="kt-pricing-1__items row">
                                    <div class="kt-pricing-1__item col-lg-4 animate__animated animate__faster" v-show="form.result" v-bind:class="{animate__fadeInLeft: form.result }">
                                        <div class="kt-pricing-1__visual">
                                            <div class="kt-pricing-1__hexagon1"></div>
                                            <div class="kt-pricing-1__hexagon2"></div>
                                            <span class="kt-pricing-1__icon kt-font-dark"><i class="fa flaticon-list"></i></span>
                                        </div>

                                        <span class="kt-pricing-1__price">Certificate</span>
                                        <h2 class="kt-pricing-1__subtitle">Download Certificate</h2>
                                        <span class="kt-pricing-1__description">
                                            <span>Lorem ipsum dolor sit amet edipiscing elit</span>
                                            <span>sed do eiusmod elpors labore et dolore</span>
                                            <span>magna siad enim aliqua</span>
                                        </span>
                                        <div class="kt-pricing-1__btn">
                                            <button type="button" class="btn btn-info btn-elevate">Download</button>
                                        </div>
                                    </div>
                                    <div class="kt-pricing-1__item" v-bind:class="[form.result ? 'col-lg-4' : 'col-lg-6']">
                                        <div class="kt-pricing-1__visual">
                                            <div class="kt-pricing-1__hexagon1"></div>
                                            <div class="kt-pricing-1__hexagon2"></div>
                                            <span class="kt-pricing-1__icon kt-font-dark"><i class="fa flaticon-business"></i></span>
                                        </div>
                                        <span class="kt-pricing-1__price">Corona Shop</span>
                                        <h2 class="kt-pricing-1__subtitle">Go To Shop</h2>
                                        <span class="kt-pricing-1__description">
                                            <span>Lorem ipsum dolor sit amet edipiscing elit</span>
                                            <span>sed do eiusmod elpors labore et dolore</span>
                                            <span>magna siad enim aliqua</span>
                                        </span>
                                        <div class="kt-pricing-1__btn">
                                            <button type="button" class="btn btn-info btn-elevate">Go To</button>
                                        </div>
                                    </div>
                                    <div class="kt-pricing-1__item" v-bind:class="[form.result ? 'col-lg-4' : 'col-lg-6']">
                                        <div class="kt-pricing-1__visual">
                                            <div class="kt-pricing-1__hexagon1"></div>
                                            <div class="kt-pricing-1__hexagon2"></div>
                                            <span class="kt-pricing-1__icon kt-font-dark"><i class="fa flaticon-information"></i></span>
                                        </div>
                                        <span class="kt-pricing-1__price">About</span>
                                        <h2 class="kt-pricing-1__subtitle">Go To Corona Page</h2>
                                        <span class="kt-pricing-1__description">
                                            <span>Lorem ipsum dolor sit amet edipiscing elit</span>
                                            <span>sed do eiusmod elpors labore et dolore</span>
                                            <span>magna siad enim aliqua</span>
                                        </span>
                                        <div class="kt-pricing-1__btn">
                                            <button type="button" class="btn btn-info btn-elevate">Go To</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="loadingModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content" style="border: none; background: none;">
                <div class="loading-widget">
                    <ul class="spinner" style="background: none;border:none">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Form',
        data: function () {
            return {
                form: {
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    address: '',
                    projectName: '',
                    constructor: '',
                    keyReceived: new Date().toJSON().slice(0, 10),
                    result: false
                }
            }
        },
        mounted() {

            axios.interceptors.request.use(function (config) {
                $('#loadingModal').modal('show');
                return config;
            }, function (error) {
                $('#loadingModal').modal('hide');
                return Promise.reject(error);
            });

            axios.interceptors.response.use(function (response) {
                $('#loadingModal').modal('hide');
                return response;
            }, function (error) {
                $('#loadingModal').modal('hide');
                return Promise.reject(error);
            });
        },
        components: {
              
        },
        methods: {
            submit: function () {

                console.log("submit", JSON.stringify(this.form));

                axios.post(window._root + 'api/customer/certificate', this.form)
                    .then((response) => {
                        if (response) {
                            console.log("response on submit", JSON.stringify(response));

                            this.form.result = true;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        window.bootbox.alert("Error on form submit");
                    });
            }
        },
        computed: {
            formDisplay: function () {
                return this.form.result ? 'none' : 'block';
            }
        }
}
</script>
