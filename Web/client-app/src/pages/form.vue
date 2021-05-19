<template>

    <!-- begin:: Subheader -->
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
        <div class="kt-container  kt-container--fluid ">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">
                    {{ _['Warranty certificate'] }}
                </h3>
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="#" class="kt-subheader__breadcrumbs-home"><i class="flaticon-interface-11"></i></a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">
                        {{ _['Customers']}}
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">
                        {{ _['Warranty certificate'] }}
                    </a>

                    <!-- <span class="kt-subheader__breadcrumbs-link kt-subheader__breadcrumbs-link--active">Active link</span> -->
                </div>
            </div>
            <div class="kt-subheader__toolbar">
                <div class="kt-subheader__wrapper">
                   
                </div>
            </div>
        </div>
    </div>

    <!-- end:: Subheader -->

    <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
        <div class="row row-no-padding animate__animated animate__slow" v-show="result" v-bind:class="{animate__fadeIn: result }">
            <div class="col">
                <div class="alert alert-success" role="alert">
                    <div class="alert-icon"><i class="flaticon-paper-plane-1"></i></div>
                    <div class="alert-text">
                        <h4 class="alert-heading">{{_['Sent successfully!']}}</h4>
                        <p> {{String.format(_['The warranty certificate was sent to {0}.'], email)}}</p>
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
                                {{ _["Header"] }}
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
                                        {{ _['Subheader'] }}
                                    </div>
                                </div>
                                <div v-if="errors.length">

                                    <div class="alert alert-solid-danger alert-bold" role="alert" v-for="error in errors" :key="error">
                                        <div class="alert-text">{{ error }}</div>
                                    </div>

                                </div>
                            </div>
                            <!--<div class="kt-space-20"></div>-->

                            <div class="kt-section">

                                <div class="kt-section__content">

                                    <div class="form-group form-group row">
                                        <div class="col-12 form-group-sub">
                                            <label class="form-control-label">* {{ _["First Name"] }}:</label>
                                            <input class="form-control" type="text" v-model="firstName" v-bind:class="[{'is-invalid': isFirstNameError}]">
                                            <div class="invalid-feedback" v-if="isFirstNameError">
                                                {{shared['Required']}}
                                            </div>
                                        </div>

                                    </div>
                                    <div class="form-group form-group row">
                                        <div class="col-12 form-group-sub">
                                            <label class="form-control-label">* {{ _["Last Name"] }}:</label>
                                            <input class="form-control" type="text" v-model="lastName" v-bind:class="[{'is-invalid': isLastNameError}]">
                                            <div class="invalid-feedback" v-if="isLastNameError">
                                                {{shared['Required']}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12 form-group-sub">
                                            <label class="form-control-label">* {{ _['Phone'] }}:</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="la la-phone"></i>
                                                    </span>
                                                </div>
                                                <input class="form-control form-control-danger" type="tel" v-model="phone" @blur="isPhoneTouched = true" v-bind:class="[{'is-invalid': isPhoneError},{'is-valid': isPhoneValid}]">
                                                <div class="invalid-feedback" v-if="isPhoneError">{{shared['Invalid phone number']}}</div>
                                            </div>
                                        </div>
          
                                    </div>
                                    <div class="form-group row">

                                        <div class="col-12 form-group-sub">
                                            <label class="form-control-label">* {{ _['Email'] }}:</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="la la-envelope"></i>
                                                    </span>
                                                </div>
                                                <input class="form-control form-control-danger" type="email" v-model="email" @blur="isEmailTouched = true" v-bind:class="[{'is-invalid': isEmailError},{'is-valid': isEmailValid}]">
                                                <div class="invalid-feedback" v-if="isEmailError">{{shared['Invalid email']}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="kt-section">
                               
                                <div class="kt-section__content">

                          
                                    <div class="form-group form-group row">
                                        <div class="col-4 form-group-sub">
                                            <label class="form-control-label">* {{ _['City'] }}:</label>
                                            <select class="form-control" v-model="city" v-bind:class="[{'is-invalid': isCityError}]">
                                                <option :value="null" disabled>-</option>
                                                <option v-for="option in $options.cities" v-bind:value="option.name" :key="option.name">
                                                    {{ option.name }}
                                                </option>
                                            </select>
                                            <div class="invalid-feedback" v-if="isCityError">
                                                {{shared['Required']}}
                                            </div>
                                        </div>
                                        <div class="col-4 form-group-sub">
                                            <label class="form-control-label">* {{ _['Floor'] }}:</label>
                                            <input class="form-control" type="number" :placeholder="_['Floor']" required v-model="floor" v-bind:class="[{'is-invalid': isFloorError}]">
                                            <div class="invalid-feedback" v-if="isFloorError">
                                                {{shared['Required']}}
                                            </div>
                                        </div>
                                        <div class="col-4 form-group-sub">
                                            <label class="form-control-label">* {{ _['Apartment'] }}:</label>
                                            <input class="form-control" type="number" v-model="apartment" v-bind:class="[{'is-invalid': isApartmentError}]">
                                            <div class="invalid-feedback" v-if="isApartmentError">
                                                {{shared['Required']}}
                                            </div>
                                        </div>

                                    </div>
                                    <div class="form-group form-group-last row">
                                        <div class="col-12 form-group-sub">
                                            <label class="form-control-label">* {{ _['Street'] }}:</label>
                                            <input class="form-control" type="text" v-model="street" v-bind:class="[{'is-invalid': isStreetError}]">
                                            <div class="invalid-feedback" v-if="isStreetError">
                                                {{shared['Required']}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

         
                            <div class="kt-section">
                                
                                <div class="kt-section__content">

                                    <div class="form-group form-group row">
                       
                                        <div class="col-6 form-group-sub">
                                            <label class="form-control-label">{{ _['Key Receipt Date'] }}:</label>
                                            <input class="form-control" type="date" min="2020-01-01" v-model="keyReceived">
                                        </div>
                                        <div class="col-6 form-group-sub">
                                            <label class="form-control-label">{{ _['Project Name'] }}:</label>
                                            <input class="form-control" type="text" v-model="projectName">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12 form-group-sub">
                                            <label class="form-control-label">* {{ _['Constructor'] }}:</label>
                                            <input class="form-control" type="text"  v-model="constructorName" v-bind:class="[{'is-invalid': isConstructorError}]">
                                            <div class="invalid-feedback" v-if="isConstructorError">
                                                {{shared['Required']}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group form-group-last row">
                                        <div class="col-12 form-group-sub">
                                            <label class="form-control-label">* {{ _['Name of Developer'] }}:</label>
                                            <input class="form-control" type="text"  v-model="developer" v-bind:class="[{'is-invalid': isDeveloperError}]">
                                            <div class="invalid-feedback" v-if="isDeveloperError">
                                                {{shared['Required']}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="kt-portlet__foot">
                            <div class="kt-form__actions">
                                <div class="row">
                                    <div class="col-2">
                                    </div>
                                    <div class="col-10">
                                        <button type="reset" style="padding: 0.86rem 3.57rem 0.86rem 3.57rem" class="btn btn-info btn-elevate mr-1" @click.prevent="submit">{{ _['Send']}}</button>
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
                            <div class="kt-pricing-1__item col-lg-4 animate__animated animate__faster" v-show="result" v-bind:class="{animate__fadeInLeft: result }">
                                <div class="kt-pricing-1__visual">
                                    <div class="kt-pricing-1__hexagon1"></div>
                                    <div class="kt-pricing-1__hexagon2"></div>
                                    <span class="kt-pricing-1__icon kt-font-dark"><i class="fa flaticon-list"></i></span>
                                </div>

                                <span class="kt-pricing-1__price">{{ shared['Warranty certificate'] }}</span>
                                <h2 class="kt-pricing-1__subtitle">{{ shared['Download Warranty Certificate'] }}</h2>
                                <span class="kt-pricing-1__description">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                                <div class="kt-pricing-1__btn">
                                    <button type="button" class="btn btn-info btn-elevate">{{ shared['Download'] }}</button>
                                </div>
                            </div>
                            <div class="kt-pricing-1__item" v-bind:class="[result == true ? 'col-lg-4' : 'col-lg-6']">
                                <div class="kt-pricing-1__visual">
                                    <div class="kt-pricing-1__hexagon1"></div>
                                    <div class="kt-pricing-1__hexagon2"></div>
                                    <span class="kt-pricing-1__icon kt-font-dark"><i class="flaticon-home-2"></i></span>
                                </div>
                                <span class="kt-pricing-1__price">{{shared['Home Page']}}</span>
                                <h2 class="kt-pricing-1__subtitle">{{shared['Go To Corona Home Page']}}</h2>
                                <span class="kt-pricing-1__description">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                                <div class="kt-pricing-1__btn">
                                    <a class="btn btn-info btn-elevate" :title="shared['Go To Home']" href="/">{{shared['Go To Home']}}</a>
                                </div>
                            </div>

                            <div class="kt-pricing-1__item" v-bind:class="[result == true ? 'col-lg-4' : 'col-lg-6']">
                                <div class="kt-pricing-1__visual">
                                    <div class="kt-pricing-1__hexagon1"></div>
                                    <div class="kt-pricing-1__hexagon2"></div>
                                    <span class="kt-pricing-1__icon kt-font-dark"><i class="la la-opencart"></i></span>
                                </div>
                                <span class="kt-pricing-1__price">{{shared['Corona Shop']}}</span>
                                <h2 class="kt-pricing-1__subtitle">{{shared['Go To Corona Shop']}}</h2>
                                <span class="kt-pricing-1__description">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                                <div class="kt-pricing-1__btn">
                                    <a class="btn btn-info btn-elevate" :title="shared['Go To Shop']" href="/">{{shared['Go To Shop']}}</a>
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
                floor: null,
                apartment: null,
                street: null,
                projectName: null,
                constructorName: null,
                developer: null,
                keyReceived: new Date().toJSON().slice(0, 10),
                errors: [],
                validation: false,
                result: false,
                _: window._resources["CertificateForm"],
                shared: window._resources["SharedResources"],
            }
        },
        mounted() {

            String.format = function (fmtstr) {
                var args = Array.prototype.slice.call(arguments, 1);
                return fmtstr.replace(/\{(\d+)\}/g, function (match, index) {
                    return args[index];
                });
            }

            for (const key in this) {
                if (localStorage[key]) {
                    console.log(`${key}: ${localStorage[key]}`);
                    this[key] = localStorage[key];
                }
            }

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
        watch: {
            firstName(value) {
                localStorage.firstName = value;
            },
            lastName(value) {
                localStorage.lastName = value;
            },
            phone(value) {
                localStorage.phone = value;
            },
            email(value) {
                localStorage.email = value;
            },
            city(value) {
                localStorage.city = value;
            },
            floor(value) {
                localStorage.floor = value;
            },
            apartment(value) {
                localStorage.apartment = value;
            },
            street(value) {
                localStorage.street = value;
            },
            projectName(value) {
                localStorage.projectName = value;
            },
            constructorName(value) {
                localStorage.constructorName = value;
            },
            developer(value) {
                localStorage.developer = value;
            },
            keyReceived(value) {
                console.log(value);
                localStorage.keyReceived = value;
            }
        },
        methods: {
            isInteger: function (value) {
                return typeof value === 'number' &&
                    isFinite(value) &&
                    Math.floor(value) === value;
            },
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
                if (this.isCityError) return false;
                if (this.isStreetError) return false;
                if (this.isApartmentError) return false;
                if (this.isFloorError) return false;
                if (this.isConstructorError) return false;

                return true;
            },
            submit: function () {


                if (!this.validate()) {

                    console.log(this.isFirstNameError);
                    console.log(this.isLastNameError);
                    console.log(this.isPhoneError);
                    console.log(this.isCityError);
                    console.log(this.isEmailError);
                    console.log(this.isStreetError);
                    console.log(this.isConstructorError);


                    return false;
                }

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
                        this.errors.push("Error on form submit");
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
            isStreetError() {
                return !this.street && this.validation
            },
            isCityError() {
                return !this.city && this.validation
            },
            isApartmentError() {
                return this.isInteger(this.apartment) && this.validation
            },
            isFloorError() {
                return this.isInteger(this.floor) && this.validation
            },
            isConstructorError() {
                return !this.constructorName && this.validation
            },
            isDeveloperError() {
                return !this.developer && this.validation
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
