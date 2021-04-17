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

                        <div class="kt-portlet__head-toolbar">
                            <button type="button" class="btn btn-info btn-elevate btn-icon" :disabled="!validated" v-bind:class="!validated ? 'disabled' : ''" @click.prevent="runOptimization" title="Начать Оптимизацию"><i class="flaticon2-start-up"></i></button>
                        </div>
                    </div>
                        <div class="kt-portlet__body">
                            <div class="kt-section kt-section--first">
                                <h3 class="kt-section__title">1. Основные:</h3>
                                <div class="kt-section__body">
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Проект:</label>
                                        <div class="col-lg-6">
                                            <input type="text" class="form-control" placeholder="имя проекта" v-model="name">
                                            <span class="form-text text-muted">пожалуйста введите имя проекта</span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Вид Маахаза:</label>
                                        <div class="col-lg-6">
                                            <select class="form-control" v-model="clip">
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
                                <h3 class="kt-section__title kt-mb-0">2. Состав:</h3>
                                <div class="kt-section__body">
                                    <div class="form-group row kt-mb-0">
                                        <div class="col-lg-12">

                                            <form ref="planks_excel_form" method="POST" enctype="multipart/form-data">
                                                <span class="float-right">
                                                    <span class="btn btn-outline-hover-info btn-elevate btn-icon fileinput-button" title="Загрузить Excel">
                                                        <i class="flaticon-file-1" aria-hidden="true"></i>
                                                        <input type="file" ref="planks_excel_file" name="ImportExcel" @input="onPlanksExcelChange" />
                                                    </span>
                                                </span>
                                                <input type="submit" style="display: none" />
                                            </form>
                                        </div>

                                    </div>
                                    <div class="form-group row">
                                        <div class="v-content container-fluid">
                                            <div class="table-editable">
                                                <table class="table table-hover table-bordered table-responsive-md text-center table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" class="text-center">№</th>
                                                            <th scope="col" class="text-center">Длина</th>
                                                            <th scope="col" class="text-center">Колличество</th>
                                                            <th scope="col" class="text-center"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody v-bind="{style:{height:plankTableHeight}}">
                                                        <tr v-for="(row, index) in planks" :id="`plank-${index}`" v-bind:key="row.id">
                                                            <td style="width: 10%;">{{index + 1}}</td>
                                                            <editableTD v-model="row.length" />
                                                            <editableTD v-model="row.count" />
                                                            <td style="width:10%;"><span @click="plankRemove(index)" v-bind:style="{cursor: 'pointer'}"><i class="fa fa-trash"></i></span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="row">
                                                    <div class="col-md-12 kt-padding-0">
                                                        <button type="button" class="btn btn-outline-hover-info btn-elevate btn-icon" @click.prevent="plankAdd" title="Добавить"><i class="flaticon2-add-1"></i></button>
                                                        <!--<button class="btn btn-dark btn-block rounded-0" @click.prevent="plankAdd"><i class="fas fa-plus" aria-hidden="true"></i> Добавить</button>-->
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
                                <h3 class="kt-section__title kt-mb-0">3. Отрезки:</h3>
                                <div class="kt-section__body">

                                    <div class="form-group row kt-mb-0">
                                        <div class="col-lg-12">
                                            <!--<button type="button" class="btn btn-outline-hover-info btn-elevate btn-icon" title="Загрузить Excel"><i class="flaticon-file-1"></i></button>-->

                                            <form ref="snippets_excel_form" method="POST" enctype="multipart/form-data">
                                                <span class="float-right">
                                                    <span class="btn btn-outline-hover-info btn-elevate btn-icon fileinput-button" title="Загрузить Excel"> 
                                                        <i class="flaticon-file-1" aria-hidden="true"></i>
                                                        <input type="file" ref="snippets_excel_file" name="ImportExcel" @input="onSnippetsExcelChange"/>
                                                    </span>
                                                </span>
                                                <input type="submit" style="display: none"/>
                                            </form>
                                        </div>

                                    </div>
                                    
                                    <div class="form-group row">
                                        <div class="v-content container-fluid">
                                            <div class="table-editable">
                                                <table class="table table-hover table-bordered table-responsive-md text-center table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" class="text-center">№</th>
                                                            <th scope="col" class="text-center">Длина</th>
                                                            <th scope="col" class="text-center">Квартира</th>
                                                            <th scope="col" class="text-center">Этаж</th>
                                                            <th scope="col" class="text-center">Столбы</th>
                                                            <th scope="col" class="text-center"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody v-bind="{style:{height: snippetTableHeight}}">
                                                        <tr v-for="(row, index) in snippets" :id="`snippet-${index}`" :key="row.id">
                                                            <td style="width: 10%;">{{index + 1}}</td>
                                                            <!--<td contenteditable="true" @input="event => onInputSnippet(event, index)" v-bind:style="{cursor: 'auto'}">{{row.length}}</td>-->
                                                            <editableTD v-model="row.length" />
                                                            <editableTD v-model="row.apartment" />
                                                            <editableTD v-model="row.floor" />
                                                            <editableTD v-model="row.columns" />
                                                            <td style="width:10%;"><span @click="snippetRemove(index)" v-bind:style="{cursor: 'pointer'}"><i class="fa fa-trash"></i></span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="row">
                                                    <div class="col-md-12 kt-padding-0">
                                                        <button type="button" class="btn btn-outline-hover-info btn-elevate btn-icon" @click.prevent="snippetAdd" title="Добавить"><i class="flaticon2-add-1"></i></button>
                                                        <!--<button class="btn btn-dark btn-block rounded-0" @click.prevent="snippetAdd"><i class="fas fa-plus" aria-hidden="true"></i> Добавить</button>-->
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

        <!--end::Portlet-->
        </div>
            <div class="col-lg-6">
                <!--<div class="kt-space-20"></div>-->

                <div class="row">

                    <!--end::Portlet-->
                    <!--begin::Portlet-->
                    <div class="kt-portlet">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title"></h3>
                            </div>
                            <div class="kt-portlet__head-toolbar">
                                <button type="button" class="btn btn-outline-hover-info btn-elevate btn-icon" @click="printResult" title="Распечатать"><i class="flaticon2-print"></i></button>
                            </div>
                            </div>
                            <div class="kt-portlet__body">
                                <iframe ref="resiframe" :srcdoc="result" style=" border:none;overflow:hidden;" v-bind="{style:{'min-height':resultTabHeight}}"></iframe>
                            </div>
                    </div>

                    <!--end::Portlet-->

                </div>


            </div>
    </div>
    </div>
</template>

<script>
    import axios from "axios";
    import editableTD from './editable-td.vue';

    export default {
        name: 'SmartCut',
        data: function () {
            return {
                name: '',
                planks: [{ id: 1, length: 7000, count: '' }],
                snippets: [{ id: 1, length: '', apartment: '', floor: '', columns: '' }],
                clip: 100,
                excelFile: '',
                result: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CuttingStock</title>	<style type="text/css">body{overflow:hidden;} .watermark{color:#d0d0d0;font-size:70pt;opacity: 0.3;-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);position:absolute;width:100%;height:100%;margin:0;z-index:-1;left:25%;top:0;}</style><style>body {margin: 0;padding: 0;width: 100%;}h5 {font-size: 20px;font-weight: bold;font-family: monospace;text-align: center;width: fit-content;margin: 10px auto;border-bottom-width: 4px;border-bottom-style: solid;border-bottom-color: transparent;padding-bottom: 3px;}table {width: 100%;table-layout: fixed;border-collapse: collapse;}td {text-align: left;vertical-align: bottom;padding: 0px;color: black;background-color: transparent;border-width: 1px;border-style: solid;border-color: lightgray;border-collapse: collapse;white-space: nowrap;}</style></head><body></head><div class="watermark"><p>Corona Glass Technologies</p></div><h5 ></h5><div style="position: relative;"><table><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr> <tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(255, 255, 255); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 128, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: thin 1px 1px 1px; border-style: solid solid double solid; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(255, 255, 255); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px; color: rgb(255, 255, 255); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(255, 255, 255); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 128, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(255, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(255, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: thin 1px 1px 1px; border-style: solid solid double solid; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: thin 1px 1px 1px; border-style: solid solid double solid; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: thin 1px 1px 1px; border-style: solid solid double solid; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr></table></div></body></html>'
            }
        },
        components: {
            editableTD
        },
        computed: {
            plankTableHeight: function () {
                //console.log('tableHeight', window.innerHeight,(window.innerHeight / 80 * 100) + 'px')
                return this.planks.length * 30 + 'px';
            },
            snipptetTableHeight: function () {
                return (window.innerHeight * 0.35) + 'px';
            },
            resultTabHeight: function () {
                return 677 + (this.planks.length + this.snippets.length) * 30  + 'px';
            },
            validated() {
                if (this.snippets.filter((i) => +i.length > 0).length > 0) {
                    return true
                }
                return false;
            }
        },
        methods: {
            init: function () {
                try {
                    axios.get(window._root + `api/tools/smartcut/init/${btoa(JSON.stringify({}))}`)
                        .then((response) => {
                            console.log(response);
                            this.rows = response.data;
                        })
                        .catch((error) => {
                            console.log(error.response.config.url, ": ", error.response.data.message);
                            window.bootbox.alert("Error on init");
                        });
                }
                catch (e) {
                    console.log('init.error:', e);
                }
            },
            plankRemove: function (index) {
                const removeByIndex = (list, index) =>
                    [
                        ...list.slice(0, index),
                        ...list.slice(index + 1)
                    ];
                this.planks = removeByIndex(this.planks, index);
            },
            plankAdd: function () {
                this.planks.push({ id: this.planks.length+1, length: '' });
            },
            snippetRemove: function (index) {
                const removeByIndex = (list, index) =>
                    [
                        ...list.slice(0, index),
                        ...list.slice(index + 1)
                    ];
                this.snippets = removeByIndex(this.snippets, index);
            },
            snippetAdd: function () {
                this.snippets.push({ id: this.snippets.length+1, length: '', apartment: '', floor: '', columns: '' });
            },
            printResult: function () {
                //var iFrameBody = this.$refs.resiframe.contentWindow.document;
                this.$refs.resiframe.contentWindow.print();      
            },
            onSnippetsExcelChange: function () {
                this.excelFile = this.$refs.snippets_excel_file.files[0];
                //var name = this.excelFile.name;//"cut_optimization (1).xlsx"
                //var size = this.excelFile.size;// 4453
                //var type = this.excelFile.type;//"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

                //if (!name.endsWith('.xlsx')) {

                //}

                var formData = new FormData(this.$refs.snippets_excel_form);
                axios.post(window._root + 'api/tools/smartcut/import/snippets', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                    .then((response) => {
                        if (response.data.snippets) {
                            this.snippets = response.data.snippets;
                            this.$refs.import_excel_file.value = '';
                        }
                    })
                    .catch((error) => {
                        console.log(error.response.config.url, ": ", error.response.data.message);
                        window.bootbox.alert("Error on import file");
                    });

            },
            onPlanksExcelChange: function () {
                this.excelFile = this.$refs.planks_excel_file.files[0];
  
                var formData = new FormData(this.$refs.planks_excel_form);
                axios.post(window._root + 'api/tools/smartcut/import/planks', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                    .then((response) => {
                        if (response.data.planks) {
                            this.planks = response.data.planks;
                            console.log(this.planks);
                            this.$refs.planks_excel_file.value = '';
                        }
                    })
                    .catch((error) => {
                        console.log(error.response.config.url, ": ", error.response.data.message);
                        window.bootbox.alert("Error on import file");
                    });

            },
            runOptimization: function () {

                var projectName = this.name;
                if (!projectName) {
                    projectName = "Corona Glass Project";
                }
                var planks = this.planks.filter((e) => e.length > 0);
                var snippets = this.snippets.filter((e) => e.length > 0);


                var pTotal = 0;
                if (planks.length > 0) {
                    pTotal = planks.map((e) => e.length * (e.count > 0 ? e.count : 1000000)).reduce((a, b) => a + b);
                }
                console.log(pTotal);
                var sTotal = 0;
                if (snippets.length > 0) {
                    sTotal = snippets.map((e) => e.length).reduce((a, b) => a + b);
                }
                console.log(sTotal);
                if (pTotal <= sTotal) {
                    window.bootbox.alert("There are no not enough items in the stock for cutting.");
                    return;
                }

                try {
                    axios.post(window._root + `api/tools/smartcut/run`, { projectName: projectName, planks: planks, snippets: snippets, clip: this.clip })
                        .then((response) => {
                            this.result = response.data;
                        })
                        .catch((error) => {
                            console.log(error.response.config.url, ": ", error.response.data.message);
                            window.bootbox.alert("Error on smartcut run");
                        });
                }
                catch (e) {
                    console.log('smartcut.run.error:', e);
                }
            }
        }
    }
</script>
