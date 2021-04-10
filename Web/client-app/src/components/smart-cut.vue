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
                    <!--begin::Form-->
                    <form class="kt-form kt-form--label-right">
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
                                <h3 class="kt-section__title">2. Состав:</h3>
                                <div class="kt-section__body">
                                    <div class="form-group row">
                                        <div class="v-content container-fluid">
                                            <div class="table-editable">
                                                <table class="table table-hover table-bordered table-responsive-md text-center table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" class="text-center">№</th>
                                                            <th scope="col" class="text-center">Длина</th>
                                                            <th scope="col" class="text-center"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody v-bind="{style:{height:plankTableHeight}}">
                                                        <tr v-for="(row, index) in planks" :id="`snippet-${index}`" v-bind:key="row.id">
                                                            <td style="width: 10%;">{{row.id}}</td>
                                                            <editableTD v-model="row.length" />
                                                            <td style="width:10%;"><span @click="plankRemove(row)" v-bind:style="{cursor: 'pointer'}"><i class="fa fa-trash"></i></span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="row">
                                                    <div class="col-md-12 kt-padding-0">
                                                        <button type="button" class="btn btn-outline-hover-info btn-elevate btn-icon float-right" @click.prevent="plankAdd" title="Добавить"><i class="flaticon2-add-1"></i></button>
                                                        <!--<button class="btn btn-dark btn-block rounded-0" @click.prevent="plankAdd"><i class="fas fa-plus" aria-hidden="true"></i> Добавить</button>-->
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
                                <h3 class="kt-section__title">3. Отрезки:</h3>
                                <div class="kt-section__body">

                                    <div class="form-group row">
                                        <div class="col-lg-12" style="text-align:right">
                                            <button type="button" class="btn btn-outline-hover-info btn-elevate btn-icon" title="Загрузить Excel"><i class="flaticon-file-1"></i></button>
                                            <!--<div class="dropdown dropdown-inline">
        <button type="button" class="btn btn-clean btn-sm btn-icon btn-icon-lg" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="flaticon-more-1"></i>
        </button>
        <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(32px, 33px, 0px);">
            <ul class="kt-nav">
                <li class="kt-nav__item">
                    <a href="#" class="kt-nav__link">
                        <i class="kt-nav__link-icon flaticon-file-1"></i>
                        <span class="kt-nav__link-text">Загрузить Excel</span>
                    </a>
                </li>
                <li class="kt-nav__item">
                    <a href="#" class="kt-nav__link">
                        <i class="kt-nav__link-icon flaticon-delete"></i>
                        <span class="kt-nav__link-text">Очистить</span>
                    </a>
                </li>

            </ul>
        </div>
    </div>-->
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
                                                        <button type="button" class="btn btn-outline-hover-info btn-elevate btn-icon float-right" @click.prevent="snippetAdd" title="Добавить"><i class="flaticon2-add-1"></i></button>
                                                        <!--<button class="btn btn-dark btn-block rounded-0" @click.prevent="snippetAdd"><i class="fas fa-plus" aria-hidden="true"></i> Добавить</button>-->
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <!--end::Form-->
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
                                <h3 class="kt-portlet__head-title">
                                    
                                </h3>
                            </div>
                            <div class="kt-portlet__head-toolbar">
                                <button type="button" class="btn btn-outline-hover-info btn-elevate btn-icon" @click="printResult" title="Распечатать"><i class="flaticon2-print"></i></button>
                            </div>
                        </div>
                        <!--begin::Form-->
                        <form class="kt-form kt-form--label-right">
                            <div class="kt-portlet__body">
                                <iframe ref="resiframe" :srcdoc="result" style=" border:none;overflow:hidden;" v-bind="{style:{'min-height':resultTabHeight}}"></iframe>
                                <!--<span v-html="result"></span>-->
                                <!--<div class="kt-section kt-section--first">
        <h3 class="kt-section__title">Состав:</h3>
        <div class="kt-section__body">
            <div class="form-group row">
                <div class="v-content container-fluid">


                </div>
            </div>
        </div>
    </div>-->
                            </div>

                        </form>

                        <!--end::Form-->
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
                planks: [{ id: 1, length: 7000 }],
                snippets: [{ id: 1, length: '', apartment: '', floor: '', columns: '' }],
                clip: 100,
                result: '<style type="text/css">.watermark{color:#d0d0d0;font-size:160pt;-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);position:absolute;width:100%;height:100%;margin:0;z-index:-1;left:-50%;top:-50%;}</style><div class="watermark"><p>Corona Glass ltd.</p></div>'
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
                return 685 + (this.planks.length + this.snippets.length) * 30  + 'px';
            },
            validated() {
                if (this.snippets.filter((i) => +i.length > 0).length > 0) {
                    return true
                }
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
            plankRemove: function (item) {
                this.planks = this.planks.filter((i) => i.id !== item.id);
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

                //let head = $(this.$refs.resiframe).contents().find("head");
                //let css = '<style type="text/css">.watermark{color:#d0d0d0;font-size:200pt;-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);position:absolute;width:100%;height:100%;margin:0;z-index:-1;left:-100px;top:-200px;}</style>';
                //$(head).append(css);         
            },
            runOptimization: function () {

                var projectName = this.name;
                if (!projectName) {
                    projectName = "default";
                }
                var planks = this.planks.filter((e) => e.length > 0).map((e) => e.length);
                var snippets = this.snippets.filter((e) => e.length > 0);

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
