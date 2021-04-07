<template>

    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-container  kt-container--fluid ">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">
                    Инструменты
                </h3>
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="#" class="kt-subheader__breadcrumbs-home"><i class="flaticon-interface-6"></i></a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">
                        Оптимизация резки
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- end:: Subheader -->

    
    <SmartCut msg="" />

</template>

<script>
    import SmartCut from '../components/smart-cut.vue'

    export default {
        name: 'Tools',
        components: {
            SmartCut
        }
    }
</script>
