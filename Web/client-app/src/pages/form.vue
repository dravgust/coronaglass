<template>
    <div class="kt-container kt-grid kt-grid--ver">
        <div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">

            <div class="kt-subheader  kt-grid__item kt-hidden-mobile">
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
                <div class="row row-no-padding animate__animated animate__slow" v-show="result" v-bind:class="{animate__fadeIn: result }">
                    <div class="col">
                        <div class="alert alert-success" role="alert">
                            <div class="alert-icon"><i class="flaticon-paper-plane-1"></i></div>
                            <div class="alert-text">
                                <h4 class="alert-heading">Sent successfully!</h4>
                                <p> The certificate was sent to {{email}}.</p>
                            </div>
                            <div class="alert-close">
                                <div class="alert-close">
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true"><i class="la la-close"></i></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-no-padding">
                    <div class="col-lg-12" v-show="!result">
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
                            <form class="kt-form kt-form--label-right" novalidate="novalidate">
                                <div class="kt-portlet__body">

                                    <div class="form-group form-group-last">
                                        <div class="alert alert-secondary" role="alert">
                                            <div class="alert-icon"><i class="flaticon-warning kt-font-brand"></i></div>
                                            <div class="alert-text">
                                                Please fill out the form with your personal data.
                                            </div>
                                        </div>
                                        <div v-if="errors.length">

                                            <div class="alert alert-solid-danger alert-bold" role="alert" v-for="error in errors" :key="error">
                                                <div class="alert-text">{{ error }}</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="kt-space-20"></div>

                                    <div class="form-group row">
                                        <label class="col-md-2 kt-hidden-mobile col-form-label">First Name *</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" placeholder="First Name" required v-model="firstName" v-bind:class="[{'is-invalid': isFirstNameError}]">
                                            <div class="invalid-feedback" v-if="isFirstNameError">
                                                This field is required.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-2 kt-hidden-mobile col-form-label">Last Name *</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" placeholder="Last Name" required v-model="lastName" v-bind:class="[{'is-invalid': isLastNameError}]">
                                            <div class="invalid-feedback" v-if="isLastNameError">
                                                This field is required.
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-2 kt-hidden-mobile col-form-label">Phone *</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="la la-phone"></i>
                                                    </span>
                                                </div>
                                                <input class="form-control form-control-danger" placeholder="Phone" type="tel" required v-model="phone" @blur="isPhoneTouched = true" v-bind:class="[{'is-invalid': isPhoneError},{'is-valid': isPhoneValid}]">
                                                <div class="invalid-feedback" v-if="isPhoneError">Invalid phone number, check the formatting of that and try again.</div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-2 kt-hidden-mobile col-form-label">Email *</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="la la-envelope"></i>
                                                    </span>
                                                </div>
                                                <input class="form-control form-control-danger" placeholder="Email" type="email" v-model="email" @blur="isEmailTouched = true" v-bind:class="[{'is-invalid': isEmailError},{'is-valid': isEmailValid}]">
                                                <div class="invalid-feedback" v-if="isEmailError">Invalid email, check the formatting of that and try again.</div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-2 kt-hidden-mobile col-form-label">City *</label>
                                        <div class="col-md-10 col-sm-12">
                                            <select class="form-control" v-model="city">
                                                <option v-for="option in $options.cities" v-bind:value="option.id" :key="option.id">
                                                    {{ option.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-2 kt-hidden-mobile col-form-label">Address *</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="la la-home"></i>
                                                    </span>
                                                </div>
                                                <input class="form-control" type="text" placeholder="Address" required v-model="address" v-bind:class="[{'is-invalid': isAddressError}]">
                                                <div class="invalid-feedback" v-if="isAddressError">
                                                    This field is required.
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-2 kt-hidden-mobile col-form-label">Project Name</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" placeholder="Project Name" v-model="projectName">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-2 kt-hidden-mobile col-form-label">Constructor *</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" required placeholder="Constructor" v-model="constructor" v-bind:class="[{'is-invalid': isConstructorError}]">
                                            <div class="invalid-feedback" v-if="isConstructorError">
                                                This field is required.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-2 col-sm-12col-form-label">Key Received</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="date" min="2020-01-01" v-model="keyReceived">
                                        </div>
                                    </div>

                                </div>
                                <div class="kt-portlet__foot">
                                    <div class="kt-form__actions">
                                        <div class="row">
                                            <div class="col-2">
                                            </div>
                                            <div class="col-10">
                                                <button type="reset" style="padding: 0.86rem 3.57rem 0.86rem 3.57rem" class="btn btn-info btn-elevate mr-1" @click.prevent="submit">Send</button>
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
                                    <div class="kt-pricing-1__item col-lg-6">
                                        <div class="kt-pricing-1__visual">
                                            <div class="kt-pricing-1__hexagon1"></div>
                                            <div class="kt-pricing-1__hexagon2"></div>
                                            <span class="kt-pricing-1__icon kt-font-dark"><i class="flaticon-home-2"></i></span>
                                        </div>
                                        <span class="kt-pricing-1__price">Home</span>
                                        <h2 class="kt-pricing-1__subtitle">Go To Corona Page</h2>
                                        <span class="kt-pricing-1__description">
                                            <span>Lorem ipsum dolor sit amet edipiscing elit</span>
                                            <span>sed do eiusmod elpors labore et dolore</span>
                                            <span>magna siad enim aliqua</span>
                                        </span>
                                        <div class="kt-pricing-1__btn">
                                            <a class="btn btn-info btn-elevate" title="Go To Home" href="/">Go To</a>
                                        </div>
                                    </div>

                                    <div class="kt-pricing-1__item col-lg-6">
                                        <div class="kt-pricing-1__visual">
                                            <div class="kt-pricing-1__hexagon1"></div>
                                            <div class="kt-pricing-1__hexagon2"></div>
                                            <span class="kt-pricing-1__icon kt-font-dark"><i class="la la-opencart"></i></span>
                                        </div>
                                        <span class="kt-pricing-1__price">Corona Shop</span>
                                        <h2 class="kt-pricing-1__subtitle">Go To Shop</h2>
                                        <span class="kt-pricing-1__description">
                                            <span>Lorem ipsum dolor sit amet edipiscing elit</span>
                                            <span>sed do eiusmod elpors labore et dolore</span>
                                            <span>magna siad enim aliqua</span>
                                        </span>
                                        <div class="kt-pricing-1__btn">
                                            <a class="btn btn-info btn-elevate" title="Go To Corona Shop" href="/">Go To</a>
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
    import { cities } from '../assets/city_list.json';
    export default {
        name: 'Form',
        cities: cities,
        data: function () {
            return {
                firstName: null,
                lastName: null,
                phone: null,
                isPhoneTouched: false,
                email: null,
                isEmailTouched: false,
                city: null,
                address: null,
                projectName: null,
                constructor: null,
                keyReceived: new Date().toJSON().slice(0, 10),
                errors: [],
                validation: false,
                result: false
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
            validPhone: function (phone) {
                var re = /^05\d{8}$/;
                return re.test(phone);
            },
            validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            validate: function () {
                this.validation = true;

                if (this.isFirstNameError) return false;
                if (this.isLastNameError) return false;
                if (this.isPhoneError) return false;
                if (this.isEmailError) return false;
                if (this.isAddressError) return false;
                if (this.isConstructorError) return false;

                return true;
            },
            submit: function () {


                if (!this.validate()) {

                    console.log(this.isFirstNameError);
                    console.log(this.isLastNameError);
                    console.log(this.isPhoneError);
                    console.log(this.isEmailError);
                    console.log(this.isAddressError);
                    console.log(this.isConstructorError);


                    return false;
                }

                console.log("submit", JSON.stringify(this.form));

                this.errors = [];
                axios.post(window._root + 'api/customer/certificate', this)
                    .then((response) => {
                        if (response) {
                            console.log("response on submit", JSON.stringify(response));

                            this.result = true;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        window.bootbox.alert("Error on form submit");
                    });
            }
        },
        computed: {
            isFirstNameError() {
                return !this.firstName && this.validation
            },
            isLastNameError() {
                return !this.lastName && this.validation
            },
            isAddressError() {
                return !this.address && this.validation
            },
            isConstructorError() {
                return !this.constructor && this.validation
            },
            isEmailValid() {
                return this.validEmail(this.email);
            },
            isEmailError() {
                return !this.isEmailValid && (this.isEmailTouched || this.validation);
            },
            isPhoneValid() {
                return this.validPhone(this.phone);
            },
            isPhoneError() {
                return !this.isPhoneValid && (this.isPhoneTouched || this.validation);
            },
        }
}
</script>
