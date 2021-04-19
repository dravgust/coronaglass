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
                                Home
                            </a>
                            <span class="kt-subheader__breadcrumbs-separator"></span>
                            <a href="" class="kt-subheader__breadcrumbs-link">
                                Customer
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

            <div class="kt-container kt-padding-0-mobile kt-grid__item kt-grid__item--fluid">
                <div class="row row-no-padding">
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
                                            <input class="form-control" type="text" placeholder="First Name" required v-model="fname">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label  class="col-md-2 kt-hidden-mobile col-form-label">Last Name</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" placeholder="Last Name" required v-model="lname">
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
                                                <input class="form-control form-control-danger" placeholder="Phone" type="tel" required v-model="phone">
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
                                                <input class="form-control form-control-danger" placeholder="Email" type="email" required v-model="email">
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
                                                <input class="form-control" type="text" placeholder="Address" required v-model="address">
                                            </div>

                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="example-password-input" class="col-md-2 kt-hidden-mobile col-form-label">Project Name</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" placeholder="Project Name" v-model="pname">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="example-password-input" class="col-md-2 kt-hidden-mobile col-form-label">Constructor</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="text" required placeholder="Constructor" v-model="constructor">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="example-date-input" class="col-md-2 col-sm-12col-form-label">Key Received</label>
                                        <div class="col-md-10 col-sm-12">
                                            <input class="form-control" type="date" min="2020-01-01" v-model="key">
                                        </div>
                                    </div>

                                </div>
                                <div class="kt-portlet__foot">
                                    <div class="kt-form__actions">
                                        <div class="row">
                                            <div class="col-2">
                                            </div>
                                            <div class="col-10">
                                                <button type="reset" class="btn btn-info btn-elevate mr-1">Submit</button>
                                                <button type="reset" class="btn btn-secondary">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <!--end::Portlet-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
        name: 'Form',
        data: function () {
            return {
                fname: '',
                lname: '',
                phone: '',
                email: '',
                address: '',
                pname: '',
                constructor: '',
                key: new Date().toJSON().slice(0, 10)
            }
        },
        components: {
              
        }
}
</script>
