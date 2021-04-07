<template>
    <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
       <div class="row">
			<div class="col-lg-6">
        <!--end::Portlet-->
        <!--begin::Portlet-->
        <div class="kt-portlet">
            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">
                        Настройки
                    </h3>
                </div>
            </div>

            <!--begin::Form-->
            <form class="kt-form kt-form--label-right">
                <div class="kt-portlet__body">
                    <div class="kt-section kt-section--first">
                        <h3 class="kt-section__title">1. Основные:</h3>
                        <div class="kt-section__body">
                            <div class="form-group row">
                                <label class="col-lg-3 col-form-label">Проект:</label>
                                <div class="col-lg-6">
                                    <input type="email" class="form-control" placeholder="имя проекта">
                                    <span class="form-text text-muted">пожалуйста введите имя проекта</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-lg-3 col-form-label">Вид Маахаза:</label>
                                <div class="col-lg-6">
                                    <select class="form-control">
                                        <option>83</option>
                                        <option>100</option>
                                        <option>116</option>
                                        <option>120</option>
                                        <option>130</option>
                                    </select>
                                    <span class="form-text text-muted">пожалуйста выберете вид маахаза</span>
                                </div>
                            </div>
                        </div>
                        <div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
                        <h3 class="kt-section__title">2. Состав:</h3>
                        <div class="kt-section__body">
                            <div class="form-group row">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="kt-portlet__foot">
                    <div class="kt-form__actions">
                        <div class="row">
                            <div class="col-lg-3"></div>
                            <div class="col-lg-6">
                                <button type="reset" class="btn btn-success">Добавить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <!--end::Form-->
        </div>

        <!--end::Portlet-->
        </div>
    </div>
    </div>

</template>

<script>
    export default {
        name: 'SmartCut',
        props: {
            msg: String
        }
    }
</script>
