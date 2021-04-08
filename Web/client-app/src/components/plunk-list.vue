<template>
    <div class="v-content container-fluid">
        <div id="plank_table" class="table-editable">
            <table class="table table-hover table-bordered table-responsive-md text-center table-sm">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">№</th>
                        <th scope="col" class="text-center">Длина</th>
                        <th scope="col" class="text-center"></th>
                    </tr>
                </thead>
                <tbody v-bind="{style:{height:tableHeight}}">
                    <tr v-for="row in rows" v-bind:key="row.id" v-bind:style="{cursor: 'pointer'}" @click="rowClick(row)">
                        <td style="width: 10%;">{{row.id}}</td>
                        <td contenteditable="true">{{row.length}}</td>
                        <td style="width:10%;"><span @click="rowRemove(row)"><i class="fa fa-trash"></i></span></td>
                    </tr>
                </tbody>
            </table>
            <div class="row">
                <div class="col-md-12 kt-padding-0">
                    <button class="btn btn-dark btn-block rounded-0" @click.prevent="rowAdd"><i class="fas fa-plus" aria-hidden="true"></i> Добавить</button>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'PlunkList',
        mounted: function () {
            console.log("plunkList.mounted");
            //this.getItems();
        },
        data: function () {
            return {
                //rows: [],
                rows: this.generateRows()
            }
        },
        components: {

        },
        computed: {
            tableHeight: function () {
                //console.log('tableHeight', window.innerHeight,(window.innerHeight / 80 * 100) + 'px')
                return this.rows.length * 30 + 'px';
            }
        },
        methods: {
            getItems: function () {
                console.log('getItems:');
                try {
                    axios.get(window._root + `api/data/subscribers/${btoa(JSON.stringify({}))}`)
                        .then((response) => {
                            console.log(response);
                            this.rows = response.data;
                        })
                        .catch((error) => {
                            console.log(error.response.config.url, ": ", error.response.data.message);
                            window.bootbox.alert("Error on getting dashboard subscribers");
                        });
                }
                catch (e) {
                    console.log('getItems.error:', e);
                }
            },
            rowClick: function (item) {

            },
            rowRemove: function (item) {
                this.rows = this.rows.filter((i) => i.id !== item.id);                
            },
            rowAdd: function () {
                this.rows.push({ id: this.rows.length, length: '' });
            },
            generateRows: function () {
                var list = [];
                var min = 5000;
                var max = 10000;
                for (var i = 1; i <= 5; i++) {
                    var random = (Math.random() * (+max - +min) + +min).toFixed(0);
                    list.push({ id: i, length: random  });
                }

                return list;
            }
        }
    }
</script>