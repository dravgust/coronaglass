<template>
    <td ref="editable" contenteditable="true" v-bind:style="{cursor: 'auto'}" @input="e => onInput(e)"></td>
    <!--@input="$emit('update:modelValue', $event.target.innerText)"-->
</template>

<script>
    export default {
        name: 'editableTD',
        props: {
            modelValue: {
                type: String,
                default: '',
            },
        },
        mounted() {
            this.$refs.editable.innerText = this.modelValue;
        },
        methods: {
            onInput(e) {
                this.$emit('update:modelValue', e.target.innerText);
            },
        }
    };
</script>